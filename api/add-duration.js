import { DateTime } from "luxon";

export default function handler(req, res) {
  const { start_iso_time, duration } = req.body;

  if (!start_iso_time || !duration) {
    return res.status(400).json({ error: "Missing start_iso_time or duration" });
  }

  try {
    // Parse with timezone preserved
    const start = DateTime.fromISO(start_iso_time, { setZone: true });

    if (!start.isValid) {
      return res.status(400).json({ error: "Invalid start_iso_time format" });
    }

    // Add duration
    const end = start.plus({ minutes: parseInt(duration) });

    // Convert end time to UTC and return
    const endUTC = end.toUTC().toISO();

    // Debug logs
    console.log("Start (Local):", start.toISO());
    console.log("End (Local):", end.toISO());
    console.log("End (UTC):", endUTC);

    return res.status(200).json({ end_iso_time: endUTC });
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}

