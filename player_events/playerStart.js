const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "playerStart",
  execute(queue, track) {
    const playEmbed = new EmbedBuilder()
      .setTitle(track.title)
      .setURL(track.url)
      .setAuthor({ name: track.author })
      .setThumbnail(track.thumbnail)
      .setDescription(`Duration: ${track.duration}`)
      .setColor("#0077f7");

    return queue.metadata.channel.send({ embeds: [playEmbed] });
  },
};
