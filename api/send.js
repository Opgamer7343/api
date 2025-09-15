let messages = []

export default function handler(req, res) {
  const now = Date.now()
  // purge expired (older than 60s)
  messages = messages.filter(m => now - m.ts <= 60000)

  if (req.method === 'POST') {
    const { user, text } = req.body
    if (!user || !text) return res.status(400).json({ ok: false })
    messages.push({ user, text, ts: now })
    return res.json({ ok: true })
  }

  if (req.method === 'GET') {
    // return current (non-expired) messages
    return res.json({ ok: true, messages: [...messages] })
  }

  res.status(405).json({ ok: false, error: 'Method not allowed' })
}
