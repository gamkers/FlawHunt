-- Comprehensive debug script for n8n workflow issue
-- This will help identify why n8n fails while direct SQL testing works

-- 1. First, let's check the exact license key from the webhook
SELECT 
    'Exact License Key Check' as test_type,
    license_key,
    user_id,
    status,
    expires_at,
    expires_at > NOW() as is_valid_expiry,
    mac_address,
    device_name,
    created_at,
    last_used_at,
    usage_count
FROM license_keys 
WHERE license_key = 'FH-B737-4FB7-1F2F-D529-0B15-F3AC';

-- 2. Test the function exactly as n8n calls it (via RPC)
-- This simulates the exact Supabase RPC call that n8n makes
SELECT 
    'N8N RPC Simulation' as test_type,
    validate_license_key('FH-B737-4FB7-1F2F-D529-0B15-F3AC', '00:11:22:33:44:55') as result;

-- 3. Check if there are any permission issues with the function
SELECT 
    'Function Permissions Check' as test_type,
    proname as function_name,
    proowner::regrole as owner,
    proacl as permissions
FROM pg_proc 
WHERE proname = 'validate_license_key';

-- 4. Check if the user_id is valid (not NULL or default test UUID)
SELECT 
    'User ID Validation' as test_type,
    user_id,
    CASE 
        WHEN user_id IS NULL THEN 'ERROR: NULL user_id'
        WHEN user_id = '00000000-0000-0000-0000-000000000000' THEN 'WARNING: Test user_id'
        ELSE 'OK: Valid user_id'
    END as user_id_status,
    license_key,
    status
FROM license_keys 
WHERE license_key = 'FH-B737-4FB7-1F2F-D529-0B15-F3AC';

-- 5. Test with verbose error handling to see what's happening
CREATE OR REPLACE FUNCTION validate_license_key_verbose(
    p_license_key TEXT,
    p_mac_address TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    license_record RECORD;
    result JSON;
    step_info TEXT;
BEGIN
    step_info := 'Starting validation';
    
    -- Input validation
    IF p_license_key IS NULL OR trim(p_license_key) = '' THEN
        result := json_build_object(
            'valid', false,
            'error', 'License key cannot be empty',
            'step', 'input_validation',
            'debug_info', json_build_object(
                'p_license_key_is_null', p_license_key IS NULL,
                'p_license_key_trimmed', trim(p_license_key),
                'p_mac_address', p_mac_address
            )
        );
        RETURN result;
    END IF;
    
    step_info := 'Searching for license key';
    
    -- Get license key details (first check if it exists at all)
    SELECT * INTO license_record
    FROM license_keys
    WHERE license_key = trim(p_license_key);
    
    IF NOT FOUND THEN
        result := json_build_object(
            'valid', false,
            'error', 'License key not found',
            'step', 'license_lookup',
            'debug_info', json_build_object(
                'searched_key', trim(p_license_key),
                'key_length', length(trim(p_license_key)),
                'total_licenses_in_db', (SELECT count(*) FROM license_keys),
                'active_licenses_in_db', (SELECT count(*) FROM license_keys WHERE status = 'active')
            )
        );
        RETURN result;
    END IF;
    
    step_info := 'Checking license status';
    
    -- Check if license is active
    IF license_record.status != 'active' THEN
        result := json_build_object(
            'valid', false,
            'error', 'License key is ' || license_record.status,
            'step', 'status_check',
            'debug_info', json_build_object(
                'current_status', license_record.status,
                'user_id', license_record.user_id,
                'expires_at', license_record.expires_at
            )
        );
        RETURN result;
    END IF;
    
    step_info := 'Checking expiration';
    
    -- Check if license is expired
    IF license_record.expires_at <= NOW() THEN
        result := json_build_object(
            'valid', false,
            'error', 'License key has expired on ' || license_record.expires_at::date,
            'step', 'expiration_check',
            'debug_info', json_build_object(
                'expires_at', license_record.expires_at,
                'current_time', NOW(),
                'is_expired', license_record.expires_at <= NOW()
            )
        );
        RETURN result;
    END IF;
    
    step_info := 'License validation successful';
    
    -- Return success with license details
    result := json_build_object(
        'valid', true,
        'plan_type', license_record.plan_type,
        'expires_at', license_record.expires_at,
        'device_name', COALESCE(license_record.device_name, 'Unknown Device'),
        'mac_address', license_record.mac_address,
        'usage_count', COALESCE(license_record.usage_count, 0),
        'last_used_at', license_record.last_used_at,
        'step', 'success',
        'debug_info', json_build_object(
            'user_id', license_record.user_id,
            'status', license_record.status,
            'created_at', license_record.created_at
        )
    );
    
    RETURN result;
    
EXCEPTION
    WHEN OTHERS THEN
        result := json_build_object(
            'valid', false,
            'error', 'Database error occurred during validation',
            'step', step_info,
            'sql_error', SQLERRM,
            'sql_state', SQLSTATE
        );
        RETURN result;
END;
$$ LANGUAGE plpgsql;

-- 6. Test the verbose function
SELECT 
    'Verbose Function Test' as test_type,
    validate_license_key_verbose('FH-B737-4FB7-1F2F-D529-0B15-F3AC', '00:11:22:33:44:55') as result;

-- 7. Check if there are any Row Level Security (RLS) policies that might be blocking access
SELECT 
    'RLS Policy Check' as test_type,
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'license_keys';

-- 8. Check current database user and role
SELECT 
    'Database User Check' as test_type,
    current_user as current_db_user,
    session_user as session_db_user,
    current_role as current_db_role;