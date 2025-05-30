export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { start_iso_time, duration } = req.body;

  if (!start_iso_time || !duration) {
    return res.status(400).json({ error: "Missing start_iso_time or duration" });
  }

  try {
    const start = new Date(start_iso_time);
    start.setMinutes(start.getMinutes() + parseInt(duration));

    const isoString = new Date(start.getTime() - start.getTimezoneOffset() * 60000)
      .toISOString()
      .replace('Z', '+08:00');

    return res.status(200).json({ end_iso_time: isoString });
  } catch (err) {
    return res.status(500).json({ error: "Invalid ISO input or server error" });
  }
}
