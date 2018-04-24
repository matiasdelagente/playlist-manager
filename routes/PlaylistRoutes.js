var express = require('express');
var router = express.Router();
var Playlist = require('../models/PlaylistModel.js');

router.route('/playlist')
.get(function(req, res){
  Playlist.find(function(err, data){
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

  playlist.save(function(err, data){
    if(err) res.json(err);
    res.json(data);
  });
});

router.route('/playlist/:id')
.get(function(req, res){
  var id = req.params.id;
  Playlist.findById(id, function(err, data){
    if(err) res.send(err);
    res.json(data);
  });
})
.post(function(req, res){
  var id = req.params.id;
  Playlist.findById(id, function(err, product){
    if(err) res.json(err);
    playlist.videos = req.body.videos;
    playlist.save(function(err, data) {
      if(err) res.json(err);
      res.json(data);
    });
  });
});

module.exports = router;
