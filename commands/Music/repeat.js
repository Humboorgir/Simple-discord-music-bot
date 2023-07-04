const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("repeat")
    .setDescription("Changes the repeat mode")
    .addIntegerOption((option) =>
      option
        .setName("mode")
        .setDescription("The repeat mode you want to set")
        .setRequired(true)
        .addChoices(
          { name: "Off", value: 0 },
          { name: "Song", value: 1 },
          { name: "Queue", value: 2 },
          { name: "Related songs", value: 3 }
        )
    ),
  execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    const mode = interaction.options.getInteger("mode");
    queue.setRepeatMode(mode);

    const modes = {
      0: "Off",
      1: "Song",
      2: "Queue",
      3: "Related songs",
    };

    const repeatEmbed = new EmbedBuilder()
      .setDescription(`Set the repeat mode to ${modes[mode]}`)
      .setColor("#0077f7");

    interaction.reply({ embeds: [repeatEmbed] });
  },
};
