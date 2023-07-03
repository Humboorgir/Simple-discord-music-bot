module.exports = {
  name: "playerSkip",
  execute(queue, track) {
    queue.metadata.channel.send(`Skipping **${track.title}**`);
  },
};
