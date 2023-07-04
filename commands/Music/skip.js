const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder().setName("skip").setDescription("Skips the current playing song"),
  execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue) return interaction.reply("There is no song being played");
    interaction.reply(`Skipping **${queue.currentTrack.title}** by ${queue.currentTrack.author}`);

    return queue.node.skip();
  },
};
