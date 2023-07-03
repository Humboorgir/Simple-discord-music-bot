const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
module.exports = {
  data: SlashCommandBuilder.setName("stop").setDescription("Stops playing music"),
  execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    const tracks = queue.tracks.toArray();
    if (!tracks.length)
      return interaction.reply({ content: "There is no song being played.", ephemeral: true });
    queue.delete();
    return tracks.reply("Stopped!");
  },
};
