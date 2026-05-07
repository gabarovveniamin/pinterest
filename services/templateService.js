import fs from "fs";

export function pickTemplate() {
  const t = ["hero", "list", "modern", "travel-guide", "where-to-stay", "beaches", "itinerary"];
  return t[Math.floor(Math.random() * t.length)];
}

export function renderTemplate(name, data) {
  let html = fs.readFileSync(`./templates/${name}.html`, "utf-8");

  Object.entries(data).forEach(([k,v]) => {
    html = html.replaceAll(`{{${k}}}`, v || "");
  });

  return html;
}
