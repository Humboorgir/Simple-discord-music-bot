const { SlashCommandBuilder, ModalSubmitFields } = require("discord.js");

const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with the bot's response time.");

async function execute(message) {
  await message.reply("Pong!");
}

module.exports = {
  data,
  execute,
};
