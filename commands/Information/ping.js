const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Replies with the bot's response time."),

  async execute(interaction) {
    const ping = interaction.client.ws.ping;
    return interaction.reply(`Ping: ${ping}ms`);
  },
};
