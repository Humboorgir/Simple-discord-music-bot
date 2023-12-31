// importing environment variables
require("dotenv").config();

const fs = require("fs");
const path = require("path");

// Connecting to the database
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongoose");
  });

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { Guilds, GuildVoiceStates, GuildMembers } = GatewayIntentBits;
const { Player } = require("discord-player");

const client = new Client({
  intents: [Guilds, GuildVoiceStates, GuildMembers],
});

const player = new Player(client);

async function load() {
  await player.extractors.loadDefault();
}
load();

client.player = player;
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
    client.commands.set(command.data.name, { category: folder, module: command });
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

// Discord-player event handler (I probably didn't need to write all this since there's only 1 event that needs to be handled)
const eventsPath_ = path.join(__dirname, "player_events");
const eventFiles_ = fs.readdirSync(eventsPath_).filter((file) => file.endsWith(".js"));

for (const file of eventFiles_) {
  const filePath = path.join(eventsPath_, file);
  const event = require(filePath);
  player.events.on(event.name, (...args) => event.execute(...args));
}

client.login(process.env.DISCORD_TOKEN);
