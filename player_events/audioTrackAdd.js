module.exports = {
  name: "audioTrackAdd",
  execute(queue, track) {
    queue.metadata.followUp(`queued **${track.title}**`);
  },
};
