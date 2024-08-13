import axios from "axios";
import "dotenv/config";

const options = {
  method: "POST",
  url: "https://chatgpt-ai-chat-bot.p.rapidapi.com/ask",
  headers: {
    "x-rapidapi-key": process.env.CHAT_GPT,
    "x-rapidapi-host": "chatgpt-ai-chat-bot.p.rapidapi.com",
    "Content-Type": "application/json",
  },
};

const fetchResponse = async (query) => {
  try {
    const response = await axios.request({
      ...options,
      data: { query },
    });
    return response.data.response;
  } catch (error) {
    console.error("Error fetching response from ChatGPT:", error);
    throw error;
  }
};

export default fetchResponse;
