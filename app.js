// importing environment variables
require("dotenv").config();

const fs = require("fs");
const path = require("path");

const { Client, GatewayIntentBits, Events, Collection } = require("discord.js");
const { Guilds } = GatewayIntentBits;

const client = new Client({
  intents: Guilds,
});

client.once(Events.ClientReady, (client) => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if (!command.data || !command.execute)
      return console.log(`The command at ${filePath} is missing a required 'data' or 'execute' property.`);
    client.commands.set(command.data.name, command);
  }
}

// handling commands
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    if (interaction.replied || interaction.deferred)
      return await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });

    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
