export default function handler(req, res) {
  const { start_iso_time, duration } = req.body;

  if (!start_iso_time || !duration) {
    return res.status(400).json({ error: "Missing start_iso_time or duration" });
  }

  try {
    // Create a Date object from the ISO string
    const startDate = new Date(start_iso_time);

    // Add duration (in minutes)
    const endDate = new Date(startDate.getTime() + parseInt(duration) * 60000);

    // Return result in ISO format, keeping the same timezone (+08:00 stays the same visually)
    const end_iso_time = endDate.toISOString().replace('Z', '+08:00');

    return res.status(200).json({ end_iso_time });
  } catch (err) {
    return res.status(500).json({ error: "Invalid input or server error" });
  }
}
