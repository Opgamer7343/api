// GET /api/poll  -> { list: [...], ts: ... }
const ONLINE = global.__ONLINE || (global.__ONLINE = {});
const TTL = 20;

module.exports = (req, res) => {
  if (req.method !== "GET") return res.status(405).end();
  const now = Date.now()/1000;
  for (const u of Object.keys(ONLINE)) if (now - ONLINE[u] > TTL) delete ONLINE[u];
  return res.json({ ok:true, list: Object.keys(ONLINE), ts: now });
};
