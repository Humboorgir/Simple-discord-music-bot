const { SlashCommandBuilder } = require("discord.js");

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
  async execute(interaction) {},
};
