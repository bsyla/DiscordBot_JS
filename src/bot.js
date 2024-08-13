import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import commandHelper from "./commands/commands.js";

const token = process.env.DISCORD_BOT_TOKEN;
const botId = process.env.BOT_ID;
const guildId = process.env.GUILD_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  console.log(`${message.author.tag}: ${message.content}`);
});

const commandsData = commandHelper.map((cmd) => ({
  name: cmd.name,
  description: cmd.description,
  options: cmd.options || [],
}));

const rest = new REST({ version: "9" }).setToken(token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands");

    //Fetch all existing commnds
    const currentCommands = await rest.get(
      Routes.applicationGuildCommands(botId, guildId)
    );

    //Delete all currecnt commands
    for (const command of currentCommands) {
      await rest.delete(
        Routes.applicationGuildCommand(botId, guildId, command.id)
      );
    }

    //Register new commands
    await rest.put(Routes.applicationCommands(botId, guildId), {
      body: commandsData,
    });

    console.log("Commands added successfully");
  } catch (error) {
    console.error(error);
  }
})();

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const { commandName, options } = interaction;

    commandHelper.forEach((command) => {
      if (commandName === command.name) {
        command.action(interaction, options);
      }
    });
  }
});

client.login(token);
