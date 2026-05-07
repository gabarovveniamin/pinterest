import { getRows } from "./services/sheetsService.js";
import { processRow } from "./core/pipeline.js";
import fs from "fs";

(async () => {
  console.log("🚀 Starting Pinterest Pin Generation\n");

  const rows = await getRows();
  const results = [];

  for (const row of rows) {
    try {
      console.log(`📌 Processing: ${row.title}`);
      const urls = await processRow(row);

      results.push({
        title: row.title,
        urls: urls
      });

      console.log(`✅ Generated ${urls.length} pins:`);
      urls.forEach((url, i) => console.log(`   ${i + 1}. ${url}`));
      console.log("");
    } catch (e) {
      console.error(`❌ ERROR for "${row.title}":`, e.message);
      results.push({
        title: row.title,
        error: e.message
      });
      console.log("");
    }
  }

  // Сохраняем результаты в файл
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outputFile = `./output/results-${timestamp}.json`;
  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));

  console.log("✨ All done!");
  console.log(`📁 Results saved to: ${outputFile}`);
})();
