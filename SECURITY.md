# Security Guide for Hiding API Keys and Tokens

## Current Issue
Your API keys and JWT tokens are visible in the built JavaScript files. This is a common issue with client-side applications built with Vite, Create React App, and similar tools.

## Why This Happens
- Vite (and other bundlers) replace `import.meta.env` variables with their actual values during build
- Client-side code must be accessible to the browser, so any embedded secrets are visible
- This is expected behavior for client-side applications

## Solutions (In Order of Security)

### 1. **Use Supabase Row Level Security (RLS) - IMMEDIATE**
Configure your Supabase database to limit what the anon key can access:

```sql
-- Enable RLS on your tables
ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;

-- Create policies that limit access
CREATE POLICY "Users can only read their own data" 
ON your_table 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create policies for anonymous users (if needed)
CREATE POLICY "Anonymous users can only read public data" 
ON public_table 
FOR SELECT 
USING (true);
```

### 2. **Implement a Backend API - MOST SECURE**
Create a backend server that handles sensitive operations:

**Backend (Node.js/Express example):**
```javascript
// server.js
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();

// Server-side environment variables (hidden from client)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // Use service key, not anon key
);

app.get('/api/data', authenticateUser, async (req, res) => {
  const { data, error } = await supabase
    .from('your_table')
    .select('*')
    .eq('user_id', req.user.id);
  
  res.json(data);
});
```

**Frontend update:**
```javascript
// Instead of direct Supabase calls
const response = await fetch('/api/data', {
  headers: {
    'Authorization': `Bearer ${userToken}`
  }
});
```

### 3. **Use Environment-Specific Keys**
Create different Supabase projects for different environments:
- Development: Full access anon key
- Production: Highly restricted anon key with RLS

### 4. **Implement API Key Rotation**
- Use short-lived tokens
- Implement token refresh mechanism
- Monitor API usage for suspicious activity

### 5. **Use a Proxy Service**
Services like Cloudflare Workers can act as a proxy:
```javascript
// Cloudflare Worker
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Add your secret API key here
  const modifiedRequest = new Request(request, {
    headers: {
      ...request.headers,
      'Authorization': 'Bearer YOUR_SECRET_KEY'
    }
  });
  
  return fetch(modifiedRequest);
}
```

## Immediate Actions You Can Take

1. **Configure Supabase RLS** (most important)
2. **Create a new restricted anon key** in Supabase dashboard
3. **Monitor API usage** in Supabase dashboard
4. **Consider moving to a backend** for production

## What NOT to Do
- ❌ Don't try to obfuscate keys in client-side code
- ❌ Don't use complex encryption in the browser
- ❌ Don't store sensitive data in localStorage/sessionStorage
- ❌ Don't rely on code minification to hide secrets

## Backend Options
- **Vercel Functions** (serverless)
- **Supabase Edge Functions** (serverless)
- **Express.js** on any hosting platform
- **Cloudflare Workers**

## Remember
Client-side secrets are never truly secret. The goal is to minimize exposure and implement proper access controls on the backend.