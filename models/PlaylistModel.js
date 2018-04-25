var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaylistSchema = Schema({
  name: String,
  creator: String,
  description: String,
  views: Number,
  videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }]
})

module.exports = mongoose.model("Playlist", PlaylistSchema);
