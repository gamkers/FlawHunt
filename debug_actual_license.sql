-- Debug script to check the actual license key from the webhook
-- License key: FH-B737-4FB7-1F2F-D529-0B15-F3AC

-- 1. Check if the license key exists in the database
SELECT 
    'License Key Check' as check_type,
    license_key,
    user_id,
    plan_type,
    status,
    expires_at,
    mac_address,
    device_name,
    created_at,
    last_used_at,
    usage_count
FROM license_keys 
WHERE license_key = 'FH-B737-4FB7-1F2F-D529-0B15-F3AC';

-- 2. Check for any similar license keys (in case of case sensitivity issues)
SELECT 
    'Case Sensitivity Check' as check_type,
    license_key,
    status,
    expires_at
FROM license_keys 
WHERE UPPER(license_key) = UPPER('FH-B737-4FB7-1F2F-D529-0B15-F3AC');

-- 3. Test the validate_license_key function with the exact license key
SELECT 
    'Function Test' as test_type,
    validate_license_key('FH-B737-4FB7-1F2F-D529-0B15-F3AC', '00:11:22:33:44:55') as result;

-- 4. Check if there are any whitespace or encoding issues
SELECT 
    'Whitespace Check' as check_type,
    license_key,
    length(license_key) as key_length,
    ascii(substring(license_key, 1, 1)) as first_char_ascii,
    ascii(substring(license_key, length(license_key), 1)) as last_char_ascii
FROM license_keys 
WHERE license_key LIKE '%FH-B737-4FB7-1F2F-D529-0B15-F3AC%';

-- 5. Check the user_id to ensure it's valid
SELECT 
    'User ID Check' as check_type,
    lk.license_key,
    lk.user_id,
    CASE 
        WHEN lk.user_id IS NULL THEN 'NULL user_id'
        WHEN lk.user_id = '00000000-0000-0000-0000-000000000000' THEN 'Default test user_id'
        ELSE 'Valid user_id'
    END as user_id_status
FROM license_keys lk
WHERE license_key = 'FH-B737-4FB7-1F2F-D529-0B15-F3AC';