const { SlashCommandBuilder } = require("discord.js");
const Playlist = require("../../models/playlist");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("playlistadd")
    .setDescription("Adds a song to the specified playlist")
    .addStringOption((option) => option.setName("playlist").setDescription("Playlist name").setRequired(true))
    .addStringOption((option) =>
      option.setName("song").setDescription("The name or URL of the song of your choice")
    ),
  async execute(interaction) {
    const playlistName = interaction.options.getString("playlist");
    const song = interaction.options.getString("song") ?? true;

    const playlist = Playlist.findOne({
      owner: {
        id: interaction.user.id,
      },
      name: playlistName,
    });
    if (!playlist) return interaction.reply("The specified playlist does not exist");

    const results = await interaction.client.player.search(song);
    const track = results.tracks[0];

    const newSong = {
      title: track.title,
      image: track.thumbnail,
      author: track.author,
      Url: track.url,
    };

    try {
      playlist.songs.push(newSong);
      interaction.reply(`Added **${newSong.title}** by ${newSong.author} to **${playlist.name}**`);
      console.log(playlist);
    } catch (e) {
      console.log(e);
      interaction.reply("Failed to save the playlist");
    }
  },
};
