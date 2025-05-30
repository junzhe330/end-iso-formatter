export default function handler(req, res) {
  const { start_iso_time, duration } = req.body;

  if (!start_iso_time || !duration) {
    return res.status(400).json({ error: "Missing start_iso_time or duration" });
  }

  try {
    // Parse as native Date
    const startDate = new Date(start_iso_time);

    if (isNaN(startDate.getTime())) {
      throw new Error("Invalid start_iso_time format");
    }

    // Add duration in minutes
    const endDate = new Date(startDate.getTime() + parseInt(duration) * 60 * 1000);

    // Return in ISO format with original offset preserved
    const isoEnd = endDate.toISOString().replace('Z', '+08:00');

    return res.status(200).json({ end_iso_time: isoEnd });

  } catch (err) {
    return res.status(500).json({ error: "Invalid ISO input or server error" });
  }
}
