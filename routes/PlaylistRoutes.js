var express = require('express');
var router = express.Router();
var Playlist = require('../models/PlaylistModel.js');
var Video = require('../models/VideoModel.js');

router.route('/playlist')
.get(function(req, res){
  Playlist.find(function(err, data) {
    if(err) res.json(err);
    res.json(data);
  });
})
.post(function(req, res){
  var playlist = new Playlist();
  playlist.name = req.body.name;
  playlist.creator = req.body.creator;
  playlist.description = req.body.description;
  playlist.views = 0;

  playlist.save(function(err, data) {
    if(err) res.json(err);
    res.json(data);
  });
});

router.route('/playlist/:id')
.get(function(req, res){
  var id = req.params.id;

  Playlist.findById(id, function(err, playlist) {
    if(err) res.send(err);

    playlist.views += 1;
    playlist.save(function(err, data){
      if(err) res.json(err);

      res.json(playlist);
    })
  }).populate('videos');
})
.post(function(req, res){
  var video = new Video();
  video.creator = req.body.creator;
  video.videoUrl = req.body.videoUrl;
  video.description = req.body.description;

  video.save(function(err, data){
    if(err) res.json(err);

    var id = req.params.id;
    Playlist.findById(id, function(err, playlist) {
      if(err) res.json(err);
      
      playlist.videos.push(data._id);
      playlist.save(function(err, newPlaylist){
        if(err) res.json(err);
        res.json(data);
      });
    });
  });
});

module.exports = router;
