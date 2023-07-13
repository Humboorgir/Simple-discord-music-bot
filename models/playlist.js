const { Schema, model } = require("mongoose");

const playlistSchema = new Schema({
  public: { type: Boolean, required: true },
  owner: {
    username: { type: String, required: true },
    tag: { type: String, required: true },
    Id: { type: String, required: true },
  },
  songs: [
    {
      title: { type: String, required: true },
      image: { type: String, required: true },
      author: { type: String, required: true },
      Url: { type: String, required: true },
    },
  ],
});

const playlistModel = model("playlist", playlistSchema);

module.exports = playlistModel;
