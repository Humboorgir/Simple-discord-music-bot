// importing environment variables
require("dotenv").config();

const fs = require("fs");
const path = require("path");

const { Client, GatewayIntentBits, Events, Collection } = require("discord.js");
const { Guilds } = GatewayIntentBits;

const client = new Client({
  intents: Guilds,
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

client.login(process.env.DISCORD_TOKEN);
