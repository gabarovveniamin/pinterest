import { enhanceContent } from "../services/aiService.js";
import { getImageForPin, getMultipleImages } from "../services/imageService.js";
import { pickTemplate, renderTemplate } from "../services/templateService.js";
import { renderImage } from "../services/renderService.js";
import { uploadFile } from "../services/driveService.js";
import { config } from "../config.js";

export async function processRow(row) {
  const enhanced = await enhanceContent(row);

  const results = [];

  for (let i = 0; i < config.variants; i++) {
    const template = pickTemplate();

    let templateData = { ...enhanced };

    // Если выбран hero шаблон (коллаж с 12 местами)
    if (template === "hero") {
      const cityName = row.title.match(/in\s+(\w+)/i)?.[1] || row.title.split(" ")[0];

      // Получаем 13 изображений (1 героическое + 12 для карточек)
      const searches = [
        `${cityName} cityscape aerial view`,
        `${cityName} landmark 1`,
        `${cityName} landmark 2`,
        `${cityName} landmark 3`,
        `${cityName} attraction 1`,
        `${cityName} attraction 2`,
        `${cityName} attraction 3`,
        `${cityName} popular place 1`,
        `${cityName} popular place 2`,
        `${cityName} popular place 3`,
        `${cityName} tourist spot 1`,
        `${cityName} tourist spot 2`,
        `${cityName} scenic view`
      ];

      const images = await getMultipleImages(searches);

      templateData = {
        ...enhanced,
        heroImage: images[0],
        number: "12",
        city: cityName.toUpperCase(),
        subtitle: "for first-timers",
        image1: images[1],
        place1: "Historic Site",
        image2: images[2],
        place2: "Cultural Landmark",
        image3: images[3],
        place3: "Main Attraction",
        image4: images[4],
        place4: "Popular Spot",
        image5: images[5],
        place5: "Must-See Place",
        image6: images[6],
        place6: "Famous Location",
        image7: images[7],
        place7: "Tourist Favorite",
        image8: images[8],
        place8: "Local Gem",
        image9: images[9],
        place9: "Hidden Treasure",
        image10: images[10],
        place10: "Top Destination",
        image11: images[11],
        place11: "Best Views",
        image12: images[12],
        place12: "Scenic Spot",
        footer: "MAP & LOCAL TIPS INCLUDED"
      };
    }
    // Если выбран travel-guide шаблон, получаем 5 разных изображений
    else if (template === "travel-guide") {
      const cityName = row.title.split(" ")[0]; // Берем первое слово как название города
      const searches = [
        `${cityName} landmark main`,
        `${cityName} attraction 1`,
        `${cityName} attraction 2`,
        `${cityName} landmark 2`,
        `${cityName} popular spot`
      ];

      const images = await getMultipleImages(searches);

      templateData = {
        ...enhanced,
        titlePart1: cityName.toUpperCase(),
        image1: images[0],  // Hero image
        image2: images[1],  // Grid position 1
        image3: images[2],  // Grid position 2
        image4: images[3],  // Grid position 3
        image5: images[4],  // Grid position 4
        spot2: "Historic Landmark",
        spot3: "Cultural Site",
        spot4: "Popular Attraction",
        spot5: "Must-See Spot"
      };
    }
    // Если выбран where-to-stay шаблон, получаем 5 изображений (1 героическое + 4 района)
    else if (template === "where-to-stay") {
      const cityName = row.title.match(/in\s+(\w+)/i)?.[1] || row.title.split(" ")[0];

      const searches = [
        `${cityName} cityscape skyline`,
        `${cityName} downtown district`,
        `${cityName} shopping district`,
        `${cityName} historic district`,
        `${cityName} modern area`
      ];

      const images = await getMultipleImages(searches);

      templateData = {
        ...enhanced,
        heroImage: images[0],
        city: cityName.toUpperCase(),
        subtitle: "Best Areas For Every Traveler",

        image1: images[1],
        area1: "Downtown",
        tagline1: "Central & Convenient",
        desc1: "Easy access to major attractions, public transport and countless dining options.",
        extra1: "Perfect for first-time visitors with hotels ranging from budget to luxury.",
        feature1a: "🚇 Transit",
        feature1b: "🏨 Hotels",
        feature1c: "🍴 Dining",
        bestFor1: "Best For<br>First Timers",

        image2: images[2],
        area2: "Shopping District",
        tagline2: "Modern & Trendy",
        desc2: "Great shopping malls, trendy restaurants and vibrant nightlife scene.",
        extra2: "Ideal location for couples with romantic cafes and entertainment options.",
        feature2a: "🛍 Shopping",
        feature2b: "🌃 Nightlife",
        feature2c: "☕ Cafes",
        bestFor2: "Best For<br>Couples",

        image3: images[3],
        area3: "Historic Quarter",
        tagline3: "Cultural & Authentic",
        desc3: "Traditional atmosphere with local charm, temples and cultural landmarks.",
        extra3: "Experience authentic local life with traditional markets and historic sites.",
        feature3a: "🏛 History",
        feature3b: "🎭 Culture",
        feature3c: "📸 Photos",
        bestFor3: "Best For<br>Culture",

        image4: images[4],
        area4: "Modern Area",
        tagline4: "Business & Comfort",
        desc4: "Contemporary hotels, business facilities and excellent transport connections.",
        extra4: "Professional environment with modern amenities and airport access nearby.",
        feature4a: "🏢 Business",
        feature4b: "💼 Modern",
        feature4c: "🚄 Access",
        bestFor4: "Best For<br>Business",

        footer: "📍 Map + Neighborhood Guide Included"
      };
    }
    // Если выбран beaches шаблон, получаем 9 изображений (1 фон + 8 пляжей)
    else if (template === "beaches") {
      const locationName = row.title.match(/in\s+(\w+)/i)?.[1] || row.title.split(" ")[0];

      const searches = [
        `${locationName} beach aerial view`,
        `${locationName} beach 1`,
        `${locationName} beach 2`,
        `${locationName} beach 3`,
        `${locationName} beach 4`,
        `${locationName} beach 5`,
        `${locationName} beach 6`,
        `${locationName} beach 7`,
        `${locationName} beach 8`
      ];

      const images = await getMultipleImages(searches);

      templateData = {
        ...enhanced,
        bgImage: images[0],
        number: "12",
        script: "Best",
        titleLine1: "Beaches In",
        titleLine2: locationName.toUpperCase(),
        subtitle: "Paradise Beaches<br>You Need To See",

        image1: images[1],
        beach1: "Beach Paradise 1",
        desc1: "Crystal clear waters",

        image2: images[2],
        beach2: "Beach Paradise 2",
        desc2: "White sand & turquoise",

        image3: images[3],
        beach3: "Beach Paradise 3",
        desc3: "Perfect for swimming",

        image4: images[4],
        beach4: "Beach Paradise 4",
        desc4: "Scenic & peaceful",

        image5: images[5],
        beach5: "Beach Paradise 5",
        desc5: "Family-friendly vibes",

        image6: images[6],
        beach6: "Beach Paradise 6",
        desc6: "Snorkeling heaven",

        image7: images[7],
        beach7: "Beach Paradise 7",
        desc7: "Dramatic coastline",

        image8: images[8],
        beach8: "Beach Paradise 8",
        desc8: "Hidden gem spot",

        moreText: "+ 4 More Amazing Beaches!",
        footer1: "📍 Map Included",
        footer2: "⭐ Tips For Each Beach"
      };
    } else {
      // Для остальных шаблонов используем одно изображение
      const image = await getImageForPin(enhanced);
      templateData.image = image;
    }

    const html = renderTemplate(template, templateData);

    const file = await renderImage(html, `pin-${row.rowIndex}-${i}`);

    const url = await uploadFile(file);

    results.push(url);
  }

  return results;
}
