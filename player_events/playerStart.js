module.exports = {
  name: "playerStart",
  execute(queue, track) {
    queue.metadata.followUp(`Playing **${track.title}**`);
  },
};
