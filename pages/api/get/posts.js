// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY)

export default async function handler(req, res) {
  supabase
  .from('posts')
  .select().then((data)=>{
      res.status(200).json(data.body)
    }
  )
}
