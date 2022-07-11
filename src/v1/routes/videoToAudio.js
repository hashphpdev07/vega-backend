'use strict';
var express = require('express');
var router = express.Router();
var ffmpeg = require('ffmpeg');


router.route('/:id?')
    .get(function (req, res) {

        var path = 'public/orignal/ForBiggerEscapes.mp4'
        var pathmusic = 'public/orignal/Instrumental1.mp3'
        var save = 'public/save/'
        
        try {
            var process = new ffmpeg(path);
            process.then(function (video) {
                // Callback mode
                video.fnExtractSoundToMP3(pathmusic, function (error, file) {
                    if (!error)
                        console.log('Audio file: ' + file);
                });
                console.log(video)
            }, function (err) {
                console.log('Error: ' + err);
            });
        } catch (e) {
            console.log(e.code);
            console.log(e.msg);
        }
     
        res.send("It's done!!!")
    })

module.exports = router;