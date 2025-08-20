// Serverless API: returns machines from Google Sheets; falls back to /public/machines.json if needed.
import { google } from "googleapis"
import fs from "fs"
import path from "path"

export default async function handler(req, res) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(
        Buffer.from(process.env.GOOGLE_SERVICE_KEY, "base64").toString()
      ),
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    })

    const sheets = google.sheets({ version: "v4", auth })
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: "Machine!A2:D",
    })

    const rows = response.data.values || []
    if (rows.length === 0) throw new Error("No rows returned from sheet")

    const machines = rows.map(([id, name, location, status]) => ({
      id,
      name,
      location,
      status,
    }))

    return res.status(200).json(machines)
  } catch (err) {
    console.error("Google Sheets API error:", err?.message || err)

    // 👉 Always return the error details for easier debugging
    try {
      const filePath = path.join(process.cwd(), "public", "machines.json")
      const raw = fs.readFileSync(filePath, "utf-8")
      const data = JSON.parse(raw)
      return res.status(200).json({
        error: "Google Sheets API failed",
        details: err?.message || err,
        fallback: data,
      })
    } catch (fallbackErr) {
      return res.status(500).json({
        error: "Both Google API and fallback failed",
        details: err?.message || err,
        fallbackError: fallbackErr?.message || fallbackErr,
      })
    }
  }
}
