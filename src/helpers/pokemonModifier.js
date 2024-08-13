import { createPokemonEmbed, createNotFoundEmbed } from "./embeds.js";
import { createEvolveButton } from "./buttonCreate.js";
import pokemonReturn from "./pokemonFinder.js";

// Function to fetch and send Pokemon details
export const fetchAndSendPokemonDetails = async (
  interaction,
  name,
  followUpInteraction = null
) => {
  const pokemonDetails = await pokemonReturn(name);

  if (pokemonDetails.data.length === 0) {
    const emptyCard = createNotFoundEmbed();
    await interaction.editReply({ embeds: [emptyCard] });
    return;
  }

  const {
    name: title,
    hp,
    level = "not specified",
    images: { large: imageURL },
    evolvesTo,
  } = pokemonDetails.data[0];

  const description = `HP is ${hp} and level is ${level}`;
  const embedCard = createPokemonEmbed(title, description, imageURL);
  const actionRow = createEvolveButton(title);

  if (followUpInteraction) {
    await followUpInteraction.editReply({
      embeds: [embedCard],
      components: [actionRow],
    });
  } else {
    await interaction.editReply({
      embeds: [embedCard],
      components: [actionRow],
    });
  }

  // Filter to ensure the interaction is from the same user and button ID
  const filter = (i) =>
    i.customId === `evolve_${title}` && i.user.id === interaction.user.id;

  // Create a message component collector to handle button interactions
  const collector = interaction.channel.createMessageComponentCollector({
    filter,
    time: 15000,
  });

  collector.on("collect", async (i) => {
    if (evolvesTo && evolvesTo.length > 0) {
      await i.deferReply();
      await fetchAndSendPokemonDetails(i, evolvesTo[0], i);
    } else {
      await i.reply({
        content: "This Pokemon doesn't evolve.",
        ephemeral: true,
      });
    }
  });

  collector.on("end", (collected) => {
    console.log(`Collected ${collected.size} interactions.`);
  });
};
