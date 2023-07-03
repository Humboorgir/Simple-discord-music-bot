module.exports = {
  name: "playerStart",
  execute(queue, track) {
    return queue.metadata.channel.send(`Playing **${track.title}** by ${track.author}`);
  },
};
