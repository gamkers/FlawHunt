-- Debug script for license validation issues
-- Run this in your Supabase SQL Editor to debug the validation function

-- First, let's check what license keys exist in the database
SELECT 
    license_key,
    status,
    expires_at,
    expires_at > NOW() as is_not_expired,
    NOW() as current_time,
    user_id,
    plan_type,
    mac_address,
    device_name
FROM license_keys 
ORDER BY created_at DESC 
LIMIT 10;

-- Create a test license key for debugging
INSERT INTO license_keys (
    user_id,
    license_key,
    plan_type,
    device_name,
    status,
    expires_at
) VALUES (
    '00000000-0000-0000-0000-000000000000', -- Placeholder user ID
    'test-license-key-123',
    'basic',
    'Test Device',
    'active',
    NOW() + INTERVAL '1 month'
) ON CONFLICT (license_key) DO NOTHING;

-- Test the validation function with debug output
CREATE OR REPLACE FUNCTION validate_license_key_debug(
    p_license_key TEXT,
    p_mac_address TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    license_record RECORD;
    result JSON;
    debug_info JSON;
BEGIN
    -- Get license key details with debug info
    SELECT * INTO license_record
    FROM license_keys
    WHERE license_key = p_license_key;
    
    -- Create debug information
    debug_info := json_build_object(
        'license_found', FOUND,
        'license_key_searched', p_license_key,
        'current_time', NOW(),
        'license_status', CASE WHEN FOUND THEN license_record.status ELSE 'NOT_FOUND' END,
        'license_expires_at', CASE WHEN FOUND THEN license_record.expires_at ELSE NULL END,
        'is_expired', CASE WHEN FOUND THEN (license_record.expires_at <= NOW()) ELSE NULL END,
        'mac_address_in_db', CASE WHEN FOUND THEN license_record.mac_address ELSE NULL END,
        'provided_mac', p_mac_address
    );
    
    -- Now check with all conditions
    SELECT * INTO license_record
    FROM license_keys
    WHERE license_key = p_license_key
    AND status = 'active'
    AND expires_at > NOW();
    
    IF NOT FOUND THEN
        result := json_build_object(
            'valid', false,
            'error', 'License key not found, expired, or inactive',
            'debug', debug_info
        );
        RETURN result;
    END IF;
    
    -- Check MAC address if provided
    IF p_mac_address IS NOT NULL THEN
        IF license_record.mac_address IS NOT NULL AND license_record.mac_address != p_mac_address THEN
            result := json_build_object(
                'valid', false,
                'error', 'License key is bound to a different device',
                'debug', debug_info
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
        'device_name', license_record.device_name,
        'debug', debug_info
    );
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Test the debug function
SELECT validate_license_key_debug('test-license-key-123', '00:11:22:33:44:55');