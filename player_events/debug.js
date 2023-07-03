module.exports = {
  name: "debug",
  execute(queue, message) {
    console.log(`Player debug event: ${message}`);
  },
};
