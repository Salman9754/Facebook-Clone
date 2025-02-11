const { createClient } = supabase
const supabaseUrl = 'https://mrpbdlgcmtsvieczdqpi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ycGJkbGdjbXRzdmllY3pkcXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2OTAyNjMsImV4cCI6MjA1NDI2NjI2M30.buGjt24m5mnN4h7lxyj8Bix34zsAXvoyWx36E-0VLxQ'
const supabaseClient = createClient(supabaseUrl, supabaseKey)
window.supabase = supabaseClient
console.log(supabaseClient);
