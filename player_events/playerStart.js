module.exports = {
  name: "playerStart",
  execute(queue, track) {
    queue.metadata.channel.send(`Playing **${track.title}**`);
  },
};
