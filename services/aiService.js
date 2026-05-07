export async function enhanceContent(data) {
  return {
    ...data,
    title: `TOP ${Math.floor(Math.random()*10+5)} ${data.title.toUpperCase()}`,
    list: [
      "Hidden gems",
      "Must visit spots",
      "Best views"
    ]
  };
}
