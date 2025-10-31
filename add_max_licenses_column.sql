-- Add max_licenses column to existing user_plans table
-- This is the SAFE approach that preserves all existing data

-- Add the column with default value
ALTER TABLE public.user_plans 
ADD COLUMN IF NOT EXISTS max_licenses INTEGER NOT NULL DEFAULT 10;

-- Update existing records to have correct max_licenses based on plan_type
UPDATE public.user_plans 
SET max_licenses = CASE 
    WHEN plan_type = 'premium' THEN 5
    WHEN plan_type = 'basic' THEN 10
    ELSE 10
END
WHERE max_licenses IS NULL OR max_licenses = 0 OR max_licenses = 1;

-- Verify the changes
SELECT id, user_id, plan_type, max_licenses, is_active, created_at 
FROM public.user_plans 
ORDER BY created_at DESC;