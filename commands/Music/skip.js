const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder().setName("skip").setDescription("Skips the current playing song"),
  execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue) return interaction.reply("There is no song being played");

    const skipEmbed = new EmbedBuilder()
      .setDescription(`Skipping ${queue.currentTrack.title} by ${queue.currentTrack.author}`)
      .setColor("#0077f7");

    interaction.reply({ embeds: [skipEmbed] });
    return queue.node.skip();
  },
};
