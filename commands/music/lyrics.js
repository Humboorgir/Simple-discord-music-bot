const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { lyricsExtractor } = require("@discord-player/extractor");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lyrics")
    .setDescription("Searches for the specified song's lyrics")
    .addStringOption((option) => {
      option.setName("song").setDescription("The name of the song which's lyrics you're looking for");
    }),
  async execute(interaction) {
    const lyricsFinder = lyricsExtractor();
    const song = interaction.options.getString("song");

    interaction.deferReply();

    const lyrics = await lyricsFinder.search(song).catch((err) => {
      console.log(err);
    });

    if (!lyrics) return interaction.followUp("Could not find the lyrics for the specified song");

    const lyricsTrimmed = lyrics.lyrics.substring(0, 1997);

    const embed = new EmbedBuilder()
      .setTitle(lyrics.title)
      .setURL(lyrics.url)
      .setThumbnail(lyrics.thumbnail)
      .setAuthor({
        name: lyrics.artist.name,
        iconURL: lyrics.artist.image,
        url: lyrics.artist.url,
      })
      .setDescription(lyricsTrimmed.length === 1997 ? `${lyricsTrimmed}...` : lyricsTrimmed);

    return interaction.followUp({ embeds: [embed] });
  },
};
