// Serverless API: returns machines from Google Sheets; falls back to /public/machines.json if needed.
import { google } from "googleapis"
import fs from "fs"
import path from "path"

export default async function handler(req, res){
  try{
    // 1) Auth using base64-encoded service account key from Vercel env var
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(Buffer.from(process.env.GOOGLE_SERVICE_KEY, "base64").toString()),
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"]
    })

    // 2) Sheets client
    const sheets = google.sheets({ version:"v4", auth })

    // 3) Read rows (adjust range to match your sheet)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: "Machine!A2:D"
    })

    const rows = response.data.values || []
    if(rows.length===0) throw new Error("No rows returned")

    // 4) Map rows to objects (add columns if you have more fields)
    const machines = rows.map(([id, name, location, status]) => ({
      id, name, location, status
    }))

    return res.status(200).json(machines)
  }catch(err){
    console.error("Google Sheets API error:", err?.message || err)

    // 5) Fallback to local JSON so the app never breaks
    try{
      const filePath = path.join(process.cwd(), "public", "machines.json")
      const raw = fs.readFileSync(filePath, "utf-8")
      const data = JSON.parse(raw)
      return res.status(200).json(data)
    }catch(fallbackErr){
      console.error("Fallback failed:", fallbackErr?.message || fallbackErr)
      return res.status(500).json({ error: "Failed to fetch machines" })
    }
  }
}
