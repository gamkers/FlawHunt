# n8n License Validation Workflow (Supabase Edition)

## Overview
This n8n workflow validates license keys, binds MAC addresses to devices, and updates device information using Supabase REST API. It's designed to work seamlessly with your Supabase license management system.

## Workflow Structure

### 1. Webhook Trigger
- **Endpoint**: `/validate-license` (POST)
- **Expected Payload**:
  ```json
  {
    "license_key": "ABC123-DEF456-GHI789",
    "mac_address": "00:11:22:33:44:55",
    "device_name": "User's MacBook Pro" // optional
  }
  ```

### 2. Input Validation
- Validates that `license_key` and `mac_address` are provided
- Returns 400 error if required fields are missing

### 3. Supabase API Validation
- Calls the `validate_license_key()` function via Supabase REST API
- Uses RPC endpoint: `POST /rest/v1/rpc/validate_license_key`
- Passes license key and MAC address as parameters
- Handles API connection errors

### 4. Result Processing
- Parses the Supabase API response
- Combines webhook data with validation results
- Prepares structured response data

### 5. Success/Error Handling
- **Success (200)**: License is valid, MAC address bound
- **Error (401)**: License validation failed
- **Error (400)**: Missing required fields
- **Error (500)**: API connection issues

### 6. Device Name Update
- Updates device name via Supabase REST API if validation succeeds
- Uses PATCH request to update license record
- Only updates if device_name is currently NULL
- Increments usage count and updates last_used_at

## Response Examples

### Success Response (200)
```json
{
  "success": true,
  "license_key": "ABC123-DEF456-GHI789",
  "mac_address": "00:11:22:33:44:55",
  "device_name": "User's MacBook Pro",
  "plan_type": "premium",
  "expires_at": "2024-12-31T23:59:59Z",
  "timestamp": "2024-01-15T10:30:00Z",
  "message": "License validated successfully and MAC address bound"
}
```

### Error Response (401)
```json
{
  "success": false,
  "license_key": "ABC123-DEF456-GHI789",
  "mac_address": "00:11:22:33:44:55",
  "device_name": "User's MacBook Pro",
  "timestamp": "2024-01-15T10:30:00Z",
  "error": "License key is expired",
  "code": "VALIDATION_FAILED"
}
```

### Missing Fields Error (400)
```json
{
  "success": false,
  "error": "Missing required fields: license_key and mac_address are required",
  "code": "MISSING_FIELDS"
}
```

## Setup Instructions

### 1. Supabase API Credentials
1. In n8n, create a new "Supabase" credential named "Supabase API"
2. Configure with your Supabase project details:
   - **Host**: `your-project-ref.supabase.co`
   - **Service Role Key**: Your Supabase service role key (from Settings → API)

### 2. Environment Variables
Set the following environment variable in n8n:
- `SUPABASE_URL`: `https://your-project-ref.supabase.co`

### 3. Import Workflow
1. Copy the contents of `n8n_license_validation_workflow.json`
2. In n8n, go to Workflows → Import from JSON
3. Paste the JSON content and import

### 4. Configure Webhook
1. Activate the workflow
2. Copy the webhook URL from the "Webhook Trigger" node
3. Use this URL in your application to validate licenses

## Supabase Configuration

### Required Database Functions
Ensure your Supabase database has the `validate_license_key()` function:

```sql
-- This should already exist from your update_database_functions.sql
CREATE OR REPLACE FUNCTION validate_license_key(
  p_license_key TEXT,
  p_mac_address TEXT
) RETURNS JSON AS $$
-- Function implementation
$$ LANGUAGE plpgsql;
```

### API Permissions
Make sure your service role has permissions to:
- Execute RPC functions (`validate_license_key`)
- Read/Write to `license_keys` table
- Access necessary columns for updates

## API Endpoints Used

### 1. RPC Function Call
```
POST https://your-project.supabase.co/rest/v1/rpc/validate_license_key
Content-Type: application/json
Authorization: Bearer YOUR_SERVICE_ROLE_KEY

{
  "p_license_key": "ABC123-DEF456-GHI789",
  "p_mac_address": "00:11:22:33:44:55"
}
```

### 2. License Update
```
PATCH https://your-project.supabase.co/rest/v1/license_keys?license_key=eq.ABC123-DEF456-GHI789
Content-Type: application/json
Authorization: Bearer YOUR_SERVICE_ROLE_KEY
Prefer: return=minimal

{
  "device_name": "User's MacBook Pro",
  "last_used_at": "2024-01-15T10:30:00Z",
  "usage_count": "usage_count + 1"
}
```

## Error Handling

The workflow includes comprehensive error handling for:
- Missing input parameters
- Supabase API connection failures
- Invalid license keys
- Expired licenses
- MAC address conflicts
- Device binding issues
- Authentication errors

## Security Considerations

- Uses Supabase service role key for authenticated API calls
- All API requests use HTTPS encryption
- MAC addresses are validated and sanitized
- License keys are handled securely without logging sensitive data
- Error messages don't expose internal system details
- Row Level Security (RLS) policies are respected

## Testing

To test the workflow:

1. **Valid License Test**:
   ```bash
   curl -X POST "YOUR_WEBHOOK_URL" \
     -H "Content-Type: application/json" \
     -d '{
       "license_key": "valid-license-key",
       "mac_address": "00:11:22:33:44:55",
       "device_name": "Test Device"
     }'
   ```

2. **Invalid License Test**:
   ```bash
   curl -X POST "YOUR_WEBHOOK_URL" \
     -H "Content-Type: application/json" \
     -d '{
       "license_key": "invalid-license-key",
       "mac_address": "00:11:22:33:44:55"
     }'
   ```

3. **Missing Fields Test**:
   ```bash
   curl -X POST "YOUR_WEBHOOK_URL" \
     -H "Content-Type: application/json" \
     -d '{
       "license_key": "test-key"
     }'
   ```

## Advantages of Supabase API Approach

- **Better Security**: Uses API keys instead of direct database credentials
- **Built-in Authentication**: Leverages Supabase's auth system
- **Rate Limiting**: Automatic API rate limiting protection
- **Monitoring**: Better logging and monitoring through Supabase dashboard
- **Scalability**: Handles connection pooling automatically
- **RLS Support**: Respects Row Level Security policies
- **Easier Deployment**: No need to manage database connection strings

## Monitoring

Monitor the workflow execution in:
- n8n's execution history for workflow performance
- Supabase Dashboard → API logs for API call monitoring
- Supabase Dashboard → Database logs for function execution
- Check API usage and rate limits in Supabase settings