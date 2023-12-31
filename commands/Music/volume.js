const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Changes the current playing song's volume")
    .addIntegerOption((option) =>
      option.setName("volume").setDescription("Select a number between 0 and 100").setRequired(true)
    ),
  execute(interaction) {
    const volume = interaction.options.getInteger("volume");
    if (!(volume >= 0 && volume <= 100))
      return interaction.reply("Select a number between **0** and **100**");

    const queue = useQueue(interaction.guild.id);
    queue.node.setVolume(volume);

    const volumeEmbed = new EmbedBuilder().setDescription(`Set the volume to ${volume}`).setColor("#0077f7");
    return interaction.reply({ embeds: [volumeEmbed] });
  },
};
