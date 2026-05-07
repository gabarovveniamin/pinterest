import fetch from "node-fetch";
import { config } from "../config.js";

export async function getImageForPin(data) {
  if (data.image && data.image.startsWith("http")) return data.image;

  const url = `https://pixabay.com/api/?key=${config.pixabayApiKey}&q=${encodeURIComponent(data.title)}&image_type=photo&orientation=vertical&safesearch=true`;
  const res = await fetch(url);
  const json = await res.json();

  return json.hits?.[0]?.largeImageURL || "https://via.placeholder.com/1000x1500";
}

// Новая функция для получения нескольких изображений
export async function getMultipleImages(queries) {
  const results = [];

  for (const query of queries) {
    const url = `https://pixabay.com/api/?key=${config.pixabayApiKey}&q=${encodeURIComponent(query)}&image_type=photo&safesearch=true&per_page=3`;
    const res = await fetch(url);
    const json = await res.json();

    const imageUrl = json.hits?.[0]?.webformatURL || "https://via.placeholder.com/400x300";
    results.push(imageUrl);
  }

  return results;
}
