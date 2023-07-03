const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder().setName("queue").setDescription("Displays the current queue"),
  execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    const tracks = queue.tracks.toArray(); //Converts the queue into a array of tracks
    if (!tracks.length) return interaction.reply("There is no song being played");
    const tracksCurrentPlayingIncluded = [...tracks, queue.currentTrack];
    const tracksFormatted = tracksCurrentPlayingIncluded
      .map((track, i) => {
        return `${i === 0 ? "[Now playing]" : ""} **${track.title}** from ${track.author}\n`;
      })
      .join("");
    interaction.reply(tracksFormatted);
  },
};
