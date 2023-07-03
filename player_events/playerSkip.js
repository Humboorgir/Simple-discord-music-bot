module.exports = {
  name: "playerSkip",
  execute(queue, track) {
    queue.metadata.reply(`Skipping **${track.title}**`);
  },
};
