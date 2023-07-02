const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays the specified song")
    .addStringOption((option) =>
      option.setName("song").setDescription("The name or URL of the song you want to play").setRequired(true)
    )
    .setDMPermission(false),
  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel)
      return interaction.reply({ content: "You need to join a voice channel first!", ephemeral: true });

    const query = interaction.options.getString("song");

    await interaction.deferReply();

    try {
      await interaction.client.player.play(voiceChannel, query, {
        nodeOptions: {
          metadata: interaction,
        },
      });

      return;
    } catch (error) {
      return interaction.followUp(`Something went wrong: ${error}`);
    }
  },
};
