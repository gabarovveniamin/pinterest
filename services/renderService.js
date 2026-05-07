import puppeteer from "puppeteer";
import { config } from "../config.js";

export async function renderImage(html, name) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({
    width: config.width,
    height: config.height,
    deviceScaleFactor: 2  // Высокая четкость для Pinterest
  });

  await page.setContent(html);

  const path = `${config.outputDir}/${name}.png`;
  await page.screenshot({ path });

  await browser.close();
  return path;
}
