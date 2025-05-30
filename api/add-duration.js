export default function handler(req, res) {
  const { start_iso_time, duration } = req.query;

  if (!start_iso_time || !duration) {
    return res.status(400).json({ error: "Missing start_iso_time or duration" });
  }

  try {
    // Convert input to Date object (preserve offset)
    const [datePart, timePart] = start_iso_time.split('T');
    const [timeWithoutOffset, offset] = timePart.split('+');
    const offsetMinutes = parseInt(offset) * 60;

    const date = new Date(`${datePart}T${timeWithoutOffset}+08:00`);
    date.setMinutes(date.getMinutes() + parseInt(duration));

    const isoString = date.toISOString().replace('Z', '+08:00');

    return res.status(200).json({ end_iso_time: isoString });
  } catch (err) {
    return res.status(500).json({ error: "Invalid ISO input or server error" });
  }
}
