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

const fetch = require("node-fetch");

app.get("/servers/:token", async (req, res) => {
  // This might not be the most optimized way to handle this (Or it might be Idk)
  // but it does its job properly for now and I don't wanna touch it unless it becomes a problem

  const { token } = req.params;
  if (!token) return res.sendStatus(400);

  const botGuildsReq = await fetch("https://discord.com/api/users/@me/guilds?scope=guilds", {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
    },
  });

  const botGuilds = await botGuildsReq.json();

  const userGuildsReq = await fetch("https://discord.com/api/users/@me/guilds?scope=guilds", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const userGuilds = await userGuildsReq.json();

  const userGuildIds = new Set(
    userGuilds.map((guild) => {
      return guild.id;
    })
  );

  const mutualGuilds = botGuilds.filter((guild) => userGuildIds.has(guild.id));

  // guilds where the user has 'MANAGE_GUILD' permission
  const allowedGuilds = mutualGuilds.filter((guild) => {
    return (guild.permissions & 0x0000000000000020) == 0x0000000000000020;
  });

  const guildsFormatted = allowedGuilds.map((guild) => {
    return {
      id: guild.id,
      name: guild.name,
      image: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`,
    };
  });

  res.status(200).json(guildsFormatted);
});

app.listen(8080, () => {
  console.log(`Server running on port 8080`);
});

client.login(process.env.DISCORD_TOKEN);
