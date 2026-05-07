import { renderTemplate } from "./services/templateService.js";
import { renderImage } from "./services/renderService.js";

const nycData = {
  dayCount: "3",
  city: "New York",
  subtitle: "Perfect For First Time Visitors",
  
  // Day 1
  day1Image: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?w=400",
  day1Icon1: "🗽",
  day1Title1: "Statue of Liberty",
  day1Desc1: "Iconic landmark & ferry",
  
  day1Icon2: "🌉",
  day1Title2: "Brooklyn Bridge",
  day1Desc2: "Walk across historic bridge",
  
  day1Icon3: "🏛",
  day1Title3: "9/11 Memorial",
  day1Desc3: "Moving tribute site",
  
  day1Icon4: "🌆",
  day1Title4: "One World Trade",
  day1Desc4: "Observatory views",
  
  // Day 2
  day2Image: "https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?w=400",
  day2Icon1: "🎨",
  day2Title1: "MoMA",
  day2Desc1: "Modern art museum",
  
  day2Icon2: "🌳",
  day2Title2: "Central Park",
  day2Desc2: "Relax & explore",
  
  day2Icon3: "🛍",
  day2Title3: "Fifth Avenue",
  day2Desc3: "Shopping & sights",
  
  day2Icon4: "🌃",
  day2Title4: "Times Square",
  day2Desc4: "Bright lights at night",
  
  // Day 3
  day3Image: "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?w=400",
  day3Icon1: "🍕",
  day3Title1: "Food Tour",
  day3Desc1: "Pizza & bagels",
  
  day3Icon2: "🎭",
  day3Title2: "Broadway Show",
  day3Desc2: "World-class theater",
  
  day3Icon3: "🏙",
  day3Title3: "High Line",
  day3Desc3: "Elevated park walk",
  
  day3Icon4: "📸",
  day3Title4: "Chelsea Market",
  day3Desc4: "Food hall & shops",
  
  footerNote: "Map + Best Spots + Tips",
  mapImage: "https://images.pexels.com/photos/2422259/pexels-photo-2422259.jpeg?w=300"
};

(async () => {
  console.log("🚀 Testing NYC 3-Day Itinerary...\n");

  try {
    const html = renderTemplate("itinerary", nycData);
    console.log("✅ Template rendered with 3 days of activities");
    
    const outputPath = await renderImage(html, "nyc-itinerary");
    console.log(`✅ Image generated: ${outputPath}`);
  } catch (e) {
    console.error("❌ ERROR:", e.message);
    console.error(e.stack);
  }
})();
