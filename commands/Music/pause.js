const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
module.exports = {
  data: new SlashCommandBuilder().setName("pause").setDescription("Pauses the current queue"),
  execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    const paused = queue.node.isPaused();

    let keyword = paused ? "Resumed" : "Paused";

    queue.node.setPaused(!paused);

    const pauseEmbed = new EmbedBuilder().setDescription(`${keyword} the current queue`).setColor("#0077f7");

    interaction.reply({ embeds: [pauseEmbed] });
  },
};
