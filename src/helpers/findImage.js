import fetch from "node-fetch";
import "dotenv/config";

const fetchImageURL = async (query) => {
  const url = "https://www.searchapi.io/api/v1/search";
  const params = new URLSearchParams({
    engine: "google_images",
    q: query,
    api_key: process.env.SEARCH_API,
  });

  try {
    const response = await fetch(`${url}?${params}`);
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Check your API key");
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }
    const data = await response.json();
    const imageURL = data.images[0].thumbnail;
    return imageURL;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export default fetchImageURL;
