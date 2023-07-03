const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("repeat")
    .setDescription("Changes the repeat mode")
    .addStringOption((option) =>
      option
        .setName("repeat mode")
        .setDescription("The repeat mode you want to set")
        .setRequired(true)
        .addChoices(
          { name: "Off", value: "0" },
          { name: "Song", value: "1" },
          { name: "Queue", value: "2" },
          { name: "Related songs", value: "3" }
        )
    ),
  execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    const mode = interaction.options.getString("repeat mode");
    queue.setRepeatMode(mode);

    // for debugging purposes
    console.log(mode);
    const modes = {
      0: "Off",
      1: "Song",
      2: "Queue",
      3: "Related songs",
    };

    interaction.reply(`Set the repeat mode to ${modes[mode]}`);
  },
};
