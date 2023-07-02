// importing environment variables
require("dotenv").config();

const fs = require("fs");
const path = require("path");

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { Guilds, GuildVoiceStates } = GatewayIntentBits;
const { Player } = require("discord-player");

const client = new Client({
  intents: [Guilds, GuildVoiceStates],
});

const player = new Player(client);

async () => {
  await player.extractors.loadDefault();
};

client.commands = new Collection();

// Command handler
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

// Event handler
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Discord-player event handler
const eventsPath_ = path.join(__dirname, "player_events");
const eventFiles_ = fs.readdirSync(eventsPath_).filter((file) => file.endsWith(".js"));

for (const file of eventFiles_) {
  const filePath = path.join(eventsPath_, file);
  const event = require(filePath);
  player.on(event.name, (...args) => event.execute(...args));
}

client.login(process.env.DISCORD_TOKEN);
