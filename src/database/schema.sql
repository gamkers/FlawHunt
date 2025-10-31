-- Flaw Hunt License Management Database Schema
-- This file contains the SQL schema for license key management

-- User plans table
CREATE TABLE user_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_type VARCHAR(20) NOT NULL DEFAULT 'basic' CHECK (plan_type IN ('basic', 'premium')),
  max_licenses INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  UNIQUE(user_id)
);

-- License keys table
CREATE TABLE license_keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  license_key VARCHAR(255) NOT NULL UNIQUE,
  plan_type VARCHAR(20) NOT NULL CHECK (plan_type IN ('basic', 'premium')),
  mac_address VARCHAR(17), -- MAC address format: XX:XX:XX:XX:XX:XX
  device_name VARCHAR(255),
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'revoked')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  last_used_at TIMESTAMP WITH TIME ZONE,
  usage_count INTEGER DEFAULT 0,
  UNIQUE(mac_address, user_id) -- One license per MAC address per user
);

-- Payment records table (for demo purposes)
CREATE TABLE payment_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  payment_method VARCHAR(50),
  payment_status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_id VARCHAR(255),
  plan_type VARCHAR(20) NOT NULL CHECK (plan_type IN ('basic', 'premium')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX idx_license_keys_user_id ON license_keys(user_id);
CREATE INDEX idx_license_keys_mac_address ON license_keys(mac_address);
CREATE INDEX idx_license_keys_status ON license_keys(status);
CREATE INDEX idx_license_keys_expires_at ON license_keys(expires_at);
CREATE INDEX idx_user_plans_user_id ON user_plans(user_id);
CREATE INDEX idx_payment_records_user_id ON payment_records(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for user_plans updated_at
CREATE TRIGGER update_user_plans_updated_at 
    BEFORE UPDATE ON user_plans 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE user_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE license_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_records ENABLE ROW LEVEL SECURITY;

-- User plans policies
CREATE POLICY "Users can view their own plan" ON user_plans
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own plan" ON user_plans
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own plan" ON user_plans
    FOR UPDATE USING (auth.uid() = user_id);

-- License keys policies
CREATE POLICY "Users can view their own license keys" ON license_keys
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own license keys" ON license_keys
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own license keys" ON license_keys
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own license keys" ON license_keys
    FOR DELETE USING (auth.uid() = user_id);

-- Payment records policies
CREATE POLICY "Users can view their own payment records" ON payment_records
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payment records" ON payment_records
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to generate license key (helper function)
CREATE OR REPLACE FUNCTION generate_license_key_string()
RETURNS TEXT AS $$
DECLARE
    key_prefix TEXT := 'FH';
    key_body TEXT;
    full_key TEXT;
BEGIN
    -- Generate a random 24-character alphanumeric string
    key_body := upper(substring(md5(random()::text || clock_timestamp()::text) from 1 for 24));
    
    -- Format as FH-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX
    full_key := key_prefix || '-' || 
                substring(key_body from 1 for 4) || '-' ||
                substring(key_body from 5 for 4) || '-' ||
                substring(key_body from 9 for 4) || '-' ||
                substring(key_body from 13 for 4) || '-' ||
                substring(key_body from 17 for 4) || '-' ||
                substring(key_body from 21 for 4);
    
    RETURN full_key;
END;
$$ LANGUAGE plpgsql;

-- Function to generate and insert license key
CREATE OR REPLACE FUNCTION generate_license_key(
    p_user_id UUID,
    p_plan_type TEXT,
    p_device_name TEXT DEFAULT 'Unknown Device'
)
RETURNS JSON AS $$
DECLARE
    new_license_key TEXT;
    license_record RECORD;
    result JSON;
BEGIN
    -- Generate unique license key
    LOOP
        new_license_key := generate_license_key_string();
        -- Check if key already exists
        IF NOT EXISTS (SELECT 1 FROM license_keys WHERE license_key = new_license_key) THEN
            EXIT;
        END IF;
    END LOOP;
    
    -- Insert new license key
    INSERT INTO license_keys (
        user_id,
        license_key,
        plan_type,
        device_name,
        status,
        expires_at
    ) VALUES (
        p_user_id,
        new_license_key,
        p_plan_type,
        p_device_name,
        'active',
        NOW() + INTERVAL '1 month'
    ) RETURNING * INTO license_record;
    
    result := json_build_object(
        'success', true,
        'license_key', license_record.license_key,
        'id', license_record.id,
        'expires_at', license_record.expires_at
    );
    
    RETURN result;
EXCEPTION
    WHEN OTHERS THEN
        result := json_build_object(
            'success', false,
            'error', SQLERRM
        );
        RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to check license key validity
CREATE OR REPLACE FUNCTION validate_license_key(
    p_license_key TEXT,
    p_mac_address TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    license_record RECORD;
    result JSON;
BEGIN
    -- Get license key details
    SELECT * INTO license_record
    FROM license_keys
    WHERE license_key = p_license_key
    AND status = 'active'
    AND expires_at > NOW();
    
    IF NOT FOUND THEN
        result := json_build_object(
            'valid', false,
            'error', 'License key not found, expired, or inactive'
        );
        RETURN result;
    END IF;
    
    -- Check MAC address if provided
    IF p_mac_address IS NOT NULL THEN
        IF license_record.mac_address IS NOT NULL AND license_record.mac_address != p_mac_address THEN
            result := json_build_object(
                'valid', false,
                'error', 'License key is bound to a different device'
            );
            RETURN result;
        END IF;
        
        -- Update MAC address if not set
        IF license_record.mac_address IS NULL THEN
            UPDATE license_keys 
            SET mac_address = p_mac_address, 
                last_used_at = NOW(),
                usage_count = usage_count + 1
            WHERE id = license_record.id;
        ELSE
            -- Update usage statistics
            UPDATE license_keys 
            SET last_used_at = NOW(),
                usage_count = usage_count + 1
            WHERE id = license_record.id;
        END IF;
    END IF;
    
    result := json_build_object(
        'valid', true,
        'plan_type', license_record.plan_type,
        'expires_at', license_record.expires_at,
        'device_name', license_record.device_name
    );
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to automatically expire licenses
CREATE OR REPLACE FUNCTION expire_old_licenses()
RETURNS INTEGER AS $$
DECLARE
    expired_count INTEGER;
BEGIN
    UPDATE license_keys 
    SET status = 'expired'
    WHERE expires_at < NOW() 
    AND status = 'active';
    
    GET DIAGNOSTICS expired_count = ROW_COUNT;
    RETURN expired_count;
END;
$$ LANGUAGE plpgsql;

-- Insert default plan for existing users (run this after creating tables)
-- INSERT INTO user_plans (user_id, plan_type) 
-- SELECT id, 'basic' FROM auth.users 
-- WHERE id NOT IN (SELECT user_id FROM user_plans);