const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder().setName("stop").setDescription("Stops playing music"),
  execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue.currentTrack)
      return interaction.reply({ content: "There are no songs being played.", ephemeral: true });

    queue.delete();
    const stopEmbed = new EmbedBuilder()
      .setDescription(`Stopped playing and cleared the queue`)
      .setColor("#0077f7");

    return interaction.reply({ embeds: [stopEmbed] });
  },
};
