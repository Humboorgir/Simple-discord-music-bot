const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Replies with the bot's response time."),
  async execute(message) {
    return message.reply("Pong!");
  },
};
