import { DateTime } from "luxon";

export default function handler(req, res) {
  const { start_iso_time, duration } = req.body;

  if (!start_iso_time || !duration) {
    return res.status(400).json({ error: "Missing start_iso_time or duration" });
  }

  try {
    // Parse the ISO string with timezone using Luxon
    const start = DateTime.fromISO(start_iso_time, { setZone: true });

    if (!start.isValid) {
      return res.status(400).json({ error: "Invalid start_iso_time format" });
    }

    const end = start.plus({ minutes: parseInt(duration) });

    // Debug logs
    console.log("Start time:", start.toISO());
    console.log("Duration (mins):", duration);
    console.log("End time:", end.toISO());

    return res.status(200).json({ end_iso_time: end.toISO() });
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}
