const { SlashCommandBuilder } = require("discord.js");
const Playlist = require("../../models/playlist");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createplaylist")
    .setDescription("Creates a new playlist")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("A name you can use to identify different playlists")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("public")
        .setDescription("If true, everyone will be able to see your playlist | true by default")
    )
    .setDMPermission(false),
  async execute(interaction) {
    const playlistName = interaction.options.getString("name");
    const public = interaction.options.getBoolean("public") ?? true;

    const playlist = new Playlist({
      public: public,
      owner: {
        username: interaction.user.username,
        tag: interaction.user.tag,
        Id: interaction.user.id,
      },
      songs: [],
    });

    try {
      await playlist.save();
      interaction.reply("Successfully saved the playlist");
    } catch (e) {
      console.log(e);
      interaction.reply("Failed to save the playlist");
    }
  },
};
