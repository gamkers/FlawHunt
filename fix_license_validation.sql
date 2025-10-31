-- Fixed license validation function
-- Run this in your Supabase SQL Editor to replace the existing function

CREATE OR REPLACE FUNCTION validate_license_key(
    p_license_key TEXT,
    p_mac_address TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    license_record RECORD;
    result JSON;
BEGIN
    -- Input validation
    IF p_license_key IS NULL OR trim(p_license_key) = '' THEN
        result := json_build_object(
            'valid', false,
            'error', 'License key cannot be empty'
        );
        RETURN result;
    END IF;
    
    -- Get license key details (first check if it exists at all)
    SELECT * INTO license_record
    FROM license_keys
    WHERE license_key = trim(p_license_key);
    
    IF NOT FOUND THEN
        result := json_build_object(
            'valid', false,
            'error', 'License key not found'
        );
        RETURN result;
    END IF;
    
    -- Check if license is active
    IF license_record.status != 'active' THEN
        result := json_build_object(
            'valid', false,
            'error', 'License key is ' || license_record.status
        );
        RETURN result;
    END IF;
    
    -- Check if license is expired
    IF license_record.expires_at <= NOW() THEN
        -- Auto-expire the license
        UPDATE license_keys
        SET status = 'expired'
        WHERE id = license_record.id;
        
        result := json_build_object(
            'valid', false,
            'error', 'License key has expired on ' || license_record.expires_at::date
        );
        RETURN result;
    END IF;
    
    -- Check MAC address if provided
    IF p_mac_address IS NOT NULL AND trim(p_mac_address) != '' THEN
        -- Normalize MAC address (remove spaces, convert to uppercase)
        p_mac_address := upper(replace(trim(p_mac_address), ' ', ''));
        
        IF license_record.mac_address IS NOT NULL THEN
            -- Normalize stored MAC address for comparison
            IF upper(replace(license_record.mac_address, ' ', '')) != p_mac_address THEN
                result := json_build_object(
                    'valid', false,
                    'error', 'License key is bound to a different device (MAC: ' || license_record.mac_address || ')'
                );
                RETURN result;
            END IF;
            
            -- Update usage statistics only
            UPDATE license_keys
            SET last_used_at = NOW(),
                usage_count = COALESCE(usage_count, 0) + 1
            WHERE id = license_record.id;
        ELSE
            -- Bind MAC address to license and update usage
            UPDATE license_keys
            SET mac_address = p_mac_address,
                last_used_at = NOW(),
                usage_count = COALESCE(usage_count, 0) + 1
            WHERE id = license_record.id;
            
            -- Update the record for return data
            license_record.mac_address := p_mac_address;
        END IF;
    ELSE
        -- No MAC address provided, just update usage
        UPDATE license_keys
        SET last_used_at = NOW(),
            usage_count = COALESCE(usage_count, 0) + 1
        WHERE id = license_record.id;
    END IF;
    
    -- Return success with license details
    result := json_build_object(
        'valid', true,
        'plan_type', license_record.plan_type,
        'expires_at', license_record.expires_at,
        'device_name', COALESCE(license_record.device_name, 'Unknown Device'),
        'mac_address', license_record.mac_address,
        'usage_count', COALESCE(license_record.usage_count, 0) + 1,
        'last_used_at', NOW()
    );
    
    RETURN result;
    
EXCEPTION
    WHEN OTHERS THEN
        -- Log the error and return a generic error message
        result := json_build_object(
            'valid', false,
            'error', 'Database error occurred during validation',
            'sql_error', SQLERRM
        );
        RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Test the function with a known license key
-- First, let's create a test license if it doesn't exist
DO $$
BEGIN
    INSERT INTO license_keys (
        user_id,
        license_key,
        plan_type,
        device_name,
        status,
        expires_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000',
        'test-license-key-123',
        'basic',
        'Test Device',
        'active',
        NOW() + INTERVAL '1 month'
    ) ON CONFLICT (license_key) DO NOTHING;
END $$;

-- Test the function
SELECT 'Test 1: Valid license with MAC' as test_name, 
       validate_license_key('test-license-key-123', '00:11:22:33:44:55') as result
UNION ALL
SELECT 'Test 2: Valid license without MAC' as test_name,
       validate_license_key('test-license-key-123') as result
UNION ALL  
SELECT 'Test 3: Invalid license key' as test_name,
       validate_license_key('invalid-key-123') as result;