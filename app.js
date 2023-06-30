// importing environment variables
require("dotenv").config();

const { Client, Events, GatewayIntentBits } = require("discord.js");

const { Guilds } = GatewayIntentBits;
const client = new Client({ intents: Guilds });

client.once("ready", (client) => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);
