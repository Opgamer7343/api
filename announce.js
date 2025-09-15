// POST /api/announce  { "uid": 12345 }
const ONLINE = global.__ONLINE || (global.__ONLINE = {});
const TTL = 20;

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  // read raw body (works on Vercel)
  let raw = "";
  for await (const chunk of req) raw += chunk;
  let body = {};
  try { body = raw ? JSON.parse(raw) : {}; } catch { return res.status(400).json({ ok:false, err:"bad json" }); }
  const uid = String(body.uid || req.query.uid || "");
  if (!uid) return res.status(400).json({ ok:false, err:"no uid" });
  ONLINE[uid] = Date.now()/1000;
  return res.json({ ok:true });
};
