import { createClient } from "@supabase/supabase-js";

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMDEzMTE1MCwiZXhwIjoxOTQ1NzA3MTUwfQ.aQ-qjMSmOEYkVcRfRIE5xw3vUp535_vsOdVB99vqeco';
const supabaseUrl = 'https://vqrbavrrwolieprkduit.supabase.co';

export const supabase = createClient(supabaseUrl, supabaseKey);