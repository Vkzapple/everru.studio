// /api/submit.js

import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  try {
    const auth = new google.auth.JWT(
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    const sheets = google.sheets({ version: "v4", auth });

    const { type, nama, email, layanan, pesan, rating, ulasan } = req.body;

    const range = type === "kontak" ? "Kontak!A:E" : "Ulasan!A:D";
    const values =
      type === "kontak"
        ? [[nama, email, layanan, pesan, new Date().toISOString()]]
        : [
            [
              nama || "Anonim",
              rating || 0,
              ulasan || "-",
              new Date().toISOString(),
            ],
          ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });

    res.status(200).json({ message: "Berhasil disimpan" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menyimpan", error: err.message });
  }
}
