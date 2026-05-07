import { google } from "googleapis";
import { config } from "../config.js";

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

const sheets = google.sheets({ version: "v4", auth });

export async function getRows() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: config.spreadsheetId,
    range: "Sheet1!A:F"
  });

  return res.data.values.slice(1).map((r,i)=>({
    rowIndex: i+2,
    title: r[0],
    description: r[1],
    image: r[5]
  }));
}

export async function updateRow(rowIndex, value) {
  await sheets.spreadsheets.values.update({
    spreadsheetId: config.spreadsheetId,
    range: `Sheet1!G${rowIndex}`,
    valueInputOption: "RAW",
    requestBody: { values: [[value]] }
  });
}
