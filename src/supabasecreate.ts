import { createClient } from "@supabase/supabase-js"


  const supabaseUrl=import.meta.env.VITE_SUP_URL

  const supabasekey=import.meta.env.VITE_SUP_KEY
  // console.log(supabasekey);
  
   const supabase=createClient(supabaseUrl,supabasekey)
//  const API_KEY=import.meta.env.VITE_API_KEY
 export default supabase