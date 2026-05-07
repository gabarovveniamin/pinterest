import { google } from "googleapis";
import fs from "fs";

const TEST_MODE = process.env.TEST_MODE === "true";

let drive;

function initDrive() {
  if (!drive && !TEST_MODE) {
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: ["https://www.googleapis.com/auth/drive"]
    });
    drive = google.drive({ version: "v3", auth });
  }
  return drive;
}

export async function uploadFile(path) {
  // В тестовом режиме просто возвращаем локальный путь
  if (TEST_MODE) {
    console.log(`   📁 File saved locally: ${path}`);
    return `file://${path}`;
  }

  const driveClient = initDrive();
  const res = await driveClient.files.create({
    requestBody: { name: path, mimeType: "image/png" },
    media: { mimeType: "image/png", body: fs.createReadStream(path) }
  });

  const id = res.data.id;

  await driveClient.permissions.create({
    fileId: id,
    requestBody: { role: "reader", type: "anyone" }
  });

  return `https://drive.google.com/uc?id=${id}`;
}
