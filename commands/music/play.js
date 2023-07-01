const { SlashCommandBuilder } = require("discord.js");
const ytdl = require("ytdl-core");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays the specified song")
    .addStringOption((option) =>
      option.setName("song").setDescription("The name or URL of the song you want to play").setRequired(true)
    )
    .setDMPermission(false),
  async execute(interaction) {
    const input = interaction.options.getString("song");
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) return interaction.reply("You need to join a voice channel first!");
    const isUrl = ytdl.validateURL(input);
    const message = isUrl ? "This is a link!" : "This is not a link!";
    interaction.reply(message);
  },
};
