const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("Displays information about current playing song"),
  execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue) return interaction.reply("There are no songs being played");
    const track = queue.currentTrack;
    interaction.reply(`Currently playing **${track.title}** by ${track.author}`);
  },
};
