import fetch from "node-fetch";
import "dotenv/config";

const url = "https://api.api-ninjas.com/v1/quotes?category=";
const apiKey = process.env.API_NINJAS_KEY;

export const fetchQuote = async (givenCategory) => {
  try {
    const response = await fetch(url + `${givenCategory}`, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const quote = data[0]?.quote || "No quote available";
    const author = data[0]?.author || "Unknown author";
    return { quote, author }; // Returning as an object for clarity
  } catch (error) {
    console.error("Error:", error);
    return null; // Return null in case of error
  }
};
