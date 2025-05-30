import { DateTime } from "luxon";

export default function handler(req, res) {
  const { start_iso_time, duration } = req.body;

  if (!start_iso_time || !duration) {
    return res.status(400).json({ error: "Missing start_iso_time or duration" });
  }

  try {
    // Parse ISO string (already in UTC, so no need to setZone)
    const start = DateTime.fromISO(start_iso_time, { zone: "utc" });

    if (!start.isValid) {
      return res.status(400).json({ error: "Invalid start_iso_time format" });
    }

    // Add duration in minutes
    const end = start.plus({ minutes: parseInt(duration) });

    // Return end time in ISO UTC format
    return res.status(200).json({ end_iso_time: end.toISO() });
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}
