module.exports = {
  name: "audioTrackAdd",
  execute(queue, track) {
    console.log(`queued something`);
    queue.metadata.reply({ content: `Queued **${track.title}** from ${track.author}`, ephemeral: true });
  },
};
