const { SlashCommandBuilder } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require("@discordjs/voice");
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
    if (!voiceChannel)
      return interaction.reply({ content: "You need to join a voice channel first!", ephemeral: true });
    const isUrl = ytdl.validateURL(input);
    if (!isUrl)
      return interaction.reply(
        "There is no support for searching yet, please provide a valid **youtube** link"
      );
    const sentReply = await interaction.reply("Loading...");
    const info = await ytdl.getInfo(input);
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });
    const player = createAudioPlayer();
    const resource = createAudioResource(ytdl(input, { filter: "audioonly" }));
    player.play(resource);
    connection.subscribe(player);
    sentReply.edit(`Playing ${info.videoDetails.title} from ${info.videoDetails.author.name}`);
  },
};
