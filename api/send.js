let messages = []

export default function handler(req, res) {
  if(req.method === 'POST') {
    const { user, text } = req.body
    if(!user || !text) return res.status(400).json({ok:false})
    messages.push({user, text})
    return res.json({ok:true})
  }

  if(req.method === 'GET') {
    const msgs = [...messages]
    messages = [] // clear after sending
    return res.json({ok:true, messages:msgs})
  }

  res.status(405).json({ok:false, error:"Method not allowed"})
}
