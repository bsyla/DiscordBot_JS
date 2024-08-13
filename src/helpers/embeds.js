import { EmbedBuilder } from "discord.js";

// Helper function to create an embed for a Pokemon
export const createPokemonEmbed = (title, description, imageURL) => {
  return new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setTimestamp()
    .setImage(imageURL);
};

// Helper function to create a "not found" embed
export const createNotFoundEmbed = () => {
  return createPokemonEmbed(
    "Not found",
    "Unidentified pokemon",
    "https://i.pinimg.com/originals/7e/48/a9/7e48a9c47f2380fe858daba033559b08.png"
  );
};

export const createEmbed = (title, imageURL) => {
  return new EmbedBuilder().setTitle(title).setTimestamp().setImage(imageURL);
};
