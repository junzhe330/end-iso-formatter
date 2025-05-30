export default function handler(req, res) {
  const { start_iso_time, duration } = req.body;

  if (!start_iso_time || !duration) {
    return res.status(400).json({ error: "Missing start_iso_time or duration" });
  }

  try {
    const startDate = new Date(start_iso_time);

    if (isNaN(startDate)) {
      return res.status(400).json({ error: "Invalid start_iso_time format" });
    }

    // Save original UTC string before math
    const originalUTC = startDate.toISOString();

    // Add duration in minutes
    startDate.setMinutes(startDate.getMinutes() + parseInt(duration));

    // ISO string is in UTC by default
    const addedUTC = startDate.toISOString();

    // Manually re-apply +08:00 timezone suffix
    const localPart = addedUTC.slice(0, -1); // remove trailing 'Z'
    const formattedEnd = `${localPart}+08:00`;

    return res.status(200).json({
      start_iso_time,
      original_utc: originalUTC,
      after_add_utc: addedUTC,
      end_iso_time: formattedEnd
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}
