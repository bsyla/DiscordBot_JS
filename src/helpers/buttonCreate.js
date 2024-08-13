import { ButtonBuilder, ActionRowBuilder, ButtonStyle } from "discord.js";

// Helper function to create an action row with an evolve button
export const createEvolveButton = (name) => {
  const button = new ButtonBuilder()
    .setCustomId(`evolve_${name}`)
    .setLabel("Evolve")
    .setStyle(ButtonStyle.Primary);

  return new ActionRowBuilder().addComponents(button);
};
