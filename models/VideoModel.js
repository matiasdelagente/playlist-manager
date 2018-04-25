var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoSchema = Schema({
  creator: String,
  videoUrl: String,
  description: String
})

module.exports = mongoose.model("Video", VideoSchema);
