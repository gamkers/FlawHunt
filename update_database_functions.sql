-- Update database functions for license key generation
-- Run this in your Supabase SQL editor

-- Drop the old function first
DROP FUNCTION IF EXISTS generate_license_key();

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