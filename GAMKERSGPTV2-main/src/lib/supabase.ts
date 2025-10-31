import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://vzrssuqkqhzogpmdqyci.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6cnNzdXFrcWh6b2dwbWRxeWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MDY4OTIsImV4cCI6MjA2Mzk4Mjg5Mn0.i5Ockd1FSA05sO-J6BgnOZKCr6z00vpItTicG3_Wft4";

export const supabase = createClient(supabaseUrl, supabaseKey);