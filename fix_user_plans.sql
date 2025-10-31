-- Migration script to fix existing user_plans table
-- This script adds the max_licenses column and updates existing records

-- Add max_licenses column if it doesn't exist
ALTER TABLE user_plans 
ADD COLUMN IF NOT EXISTS max_licenses INTEGER NOT NULL DEFAULT 10;

-- Update existing basic plans to have 10 licenses
UPDATE user_plans 
SET max_licenses = 10 
WHERE plan_type = 'basic' AND (max_licenses IS NULL OR max_licenses = 0 OR max_licenses = 1);

-- Update existing premium plans to have 5 licenses
UPDATE user_plans 
SET max_licenses = 5 
WHERE plan_type = 'premium' AND (max_licenses IS NULL OR max_licenses = 0 OR max_licenses = 1);

-- Verify the changes
SELECT user_id, plan_type, max_licenses, created_at 
FROM user_plans 
ORDER BY created_at DESC;