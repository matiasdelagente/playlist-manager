var mongoose = require('mongoose');

var PlaylistSchema = {
  name: String,
  creator: String,
  description: String,
  views: Number,
}

module.exports = mongoose.model("playlist", PlaylistSchema);
