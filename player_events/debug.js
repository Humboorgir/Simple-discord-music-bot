module.exports = {
  name: "debug",
  execute(message) {
    console.log(`Player debug event: ${message}`);
  },
};
