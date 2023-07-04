const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("help").setDescription("Displays a list of available commands"),
  execute(interaction) {
    const commands = interaction.client.commands;

    let description = "If you want more information about an indiviual command, use /help [command]";

    let categories = [];

    commands.forEach((value, key) => {
      if (!categories.includes(value.category)) {
        description += `\n${value.category}\n`;
        categories = [...categories, value.category];
      }
      description += `${key} `;
    });

    const helpEmbed = new EmbedBuilder()
      .setColor("#0077f7")
      .setTitle("Here's a list of all the available commands")
      .setDescription(description);

    interaction.reply({ embeds: [helpEmbed] });
  },
};
