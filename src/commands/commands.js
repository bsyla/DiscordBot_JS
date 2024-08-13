import { ApplicationCommandOptionType } from "discord.js";
import { fetchAndSendPokemonDetails } from "../helpers/pokemonModifier.js";
import { fetchQuote } from "../helpers/getQuotes.js";
import fetchImageURL from "../helpers/findImage.js";
import { createEmbed } from "../helpers/embeds.js";
import fetchResponse from "../helpers/chatGPT.js";

const commands = [
  {
    name: "chat_gpt",
    description: "ChatGPT Bot",
    options: [
      {
        name: "prompt",
        description: "Kindly enter your prompt",
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
    action: async function (interaction, options) {
      const prompt = options.getString("prompt");
      try {
        await interaction.deferReply(); // Defer the reply to handle longer processing

        const response = await fetchResponse(prompt);

        // Log the response for debugging
        console.log("ChatGPT response:", response);

        // Check if the response is valid
        if (!response) {
          throw new Error("Invalid response from ChatGPT");
        }

        // Reply with the fetched response
        await interaction.editReply({ content: response });
      } catch (error) {
        console.error("Error processing interaction:", error);
        await interaction.editReply({
          content: "Sorry, something went wrong.",
        });
      }
    },
  },
  {
    name: "pokemon",
    description: "Answers to user with card of pokemon!",
    options: [
      {
        name: "pokemon",
        description: "Name of Pokemon",
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
    action: async function (interaction, options) {
      const name = options.getString("pokemon");
      await interaction.deferReply({ ephemeral: true });
      await fetchAndSendPokemonDetails(interaction, name);
    },
  },
  {
    name: "ping",
    description: "Answers to user with PONG!",
    action: async function (interaction, options) {
      await interaction.reply({ content: "PONG!" });
    },
  },
  {
    name: "quote_finder",
    description: "Answers to user with a quote from the category chosen!",
    options: [
      {
        name: "type",
        description: "Type of quote",
        required: true,
        type: ApplicationCommandOptionType.String,
        choices: [
          { name: "happiness", value: "happiness" },
          { name: "anger", value: "anger" },
          { name: "cool", value: "cool" },
          { name: "car", value: "car" },
          { name: "dating", value: "dating" },
        ],
      },
    ],
    action: async function (interaction, options) {
      const category = options.getString("type");

      try {
        await interaction.deferReply();

        const { quote, author } = await fetchQuote(category);
        const imageURL = await fetchImageURL(author);

        if (!imageURL || !quote || !author) {
          throw new Error("Failed to fetch necessary data");
        }
        const embedCard = createEmbed(author, imageURL);

        await interaction.editReply({
          content: `- **Quote**: ${quote}\n- **Author**: ${author}`,
          embeds: [embedCard],
        });
      } catch (error) {
        console.error("Failed to fetch quote or image:", error);
        await interaction.editReply({
          content: "Sorry, something went wrong while fetching the quote.",
        });
      }
    },
  },
];

export default commands;
