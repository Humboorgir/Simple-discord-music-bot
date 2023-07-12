// importing environment variables
require("dotenv").config();

const fs = require("fs");
const path = require("path");

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

const express = require("express");
const app = express();
const cors = require("cors");
const { PermissionsBitField } = require("discord.js");

app.use(
  cors({
    origin: "*",
  })
);

app.get("/servers/:token", async (req, res) => {
  const { token } = req.params;
  if (!token) return res.sendStatus(400);

  const botGuilds = await axios.get("https://discord.com/api/users/@me/guilds?scope=guilds", {
    Headers: {
      Authorization: `Bot ${DISCORD_TOKEN}`,
    },
  });

  const userGuilds = await axios.get("https://discord.com/api/users/@me/guilds?scope=guilds", {
    Headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const userGuildsSet = new Set(userGuilds);

  const mutualGuilds = botGuilds.filter((guild) => userGuildsSet.has(guild.id));

  res.status(200).json(mutualGuilds);
});

app.listen(8080, () => {
  console.log(`Server running on port 8080`);
});

client.login(process.env.DISCORD_TOKEN);
