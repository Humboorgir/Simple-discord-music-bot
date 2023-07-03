module.exports = {
  name: "playerStart",
  execute(queue, track) {
    console.log(`started playing something`);
    queue.metadata.channel.send(`Playing **${track.title}** from ${track.author}`);
  },
};
