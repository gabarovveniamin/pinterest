import { renderTemplate } from "./services/templateService.js";
import { renderImage } from "./services/renderService.js";

const hawaiiData = {
  bgImage: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?w=1200",
  number: "12",
  script: "Best",
  titleLine1: "Beaches In",
  titleLine2: "Hawaii",
  subtitle: "Paradise Beaches<br>You Need To See",
  
  // Waikiki Beach
  image1: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?w=400",
  beach1: "Waikiki Beach",
  desc1: "Iconic & perfect waves",
  
  // Lanikai Beach
  image2: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?w=400",
  beach2: "Lanikai Beach",
  desc2: "Turquoise & pristine",
  
  // Hanauma Bay
  image3: "https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?w=400",
  beach3: "Hanauma Bay",
  desc3: "Snorkeling paradise",
  
  // Kaanapali Beach
  image4: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?w=400",
  beach4: "Kaanapali Beach",
  desc4: "Golden sand & sunsets",
  
  // Napili Bay
  image5: "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?w=400",
  beach5: "Napili Bay",
  desc5: "Calm & family-friendly",
  
  // Poipu Beach
  image6: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?w=400",
  beach6: "Poipu Beach",
  desc6: "Safe & scenic views",
  
  // Hapuna Beach
  image7: "https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?w=400",
  beach7: "Hapuna Beach",
  desc7: "White sand & crystal clear",
  
  // Tunnels Beach
  image8: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?w=400",
  beach8: "Tunnels Beach",
  desc8: "Dramatic & wild beauty",
  
  moreText: "+ 4 More Amazing Beaches!",
  footer1: "📍 Map Included",
  footer2: "⭐ Tips For Each Beach"
};

(async () => {
  console.log("🚀 Testing Hawaii Beaches with Pexels images...\n");

  try {
    const html = renderTemplate("beaches", hawaiiData);
    console.log("✅ Template rendered with 8 real Hawaii beaches");
    
    const outputPath = await renderImage(html, "hawaii-beaches-v2");
    console.log(`✅ Image generated: ${outputPath}`);
  } catch (e) {
    console.error("❌ ERROR:", e.message);
    console.error(e.stack);
  }
})();
