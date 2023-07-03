const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder().setName("queue").setDescription("Displays the current queue"),
  execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    const tracks = queue.tracks.toArray(); //Converts the queue into a array of tracks
    if (!tracks.length) return interaction.reply("There is no song being played");
    const tracksFormatted = tracks
      .map((track) => {
        return `**${track.title}** from ${track.author}\n`;
      })
      .join("");
    interaction.reply(tracksFormatted);
  },
};
