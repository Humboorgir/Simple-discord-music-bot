const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("play").setDescription("Plays the specified song"),
  async execute() {
    console.log("test");
  },
};
