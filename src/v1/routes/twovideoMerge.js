'use strict';
var express = require('express');
var router = express.Router();
var ffmpeg = require('fluent-ffmpeg');
var mergedVideo = ffmpeg();
const fs = require('fs');

const ffmpegPath = require('ffmpeg-static').replace('app.asar', 'app.asar.unpacked');
const ffprobePath = require('ffprobe-static').path.replace('app.asar', 'app.asar.unpacked');
//tell the ffmpeg package where it can find the needed binaries.
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

router.route('/:id?')
  .get(function (req, res) {

    var video1 = 'public/orignal/ForBiggerBlazes.mp4'
    var video2 = 'public/orignal/ForBiggerEscapes.mp4'
    var pathmusic = 'public/orignal/Instrumental1.mp3'
    var image = 'public/orignal/background.jpg'
    var save = 'public/save/twovideomerge.mp4'
    var temp = 'public/temp'
    var result = ""



    mergedVideo.input(video1)
      .input(video2)
      .inputOptions(['-vsync 0'])
      // Specify video bitrate in kbps (the 'k' is optional)
      .withVideoBitrate('650k')
      .withFpsInput(30)
      // Specify a constant video bitrate
      .withVideoBitrate('650k', true)
      
      .on('error', function (err) {
        console.log('Error ' + err.message);
      })
      .on('start', function (commandLine) {
        console.log('Spawned Ffmpeg with command: ' + commandLine);
      })
      .on('progress', function (progress) {
        console.log('Processing: ' + progress.percent + '% done');
        result += 'Processing: ' + progress.percent + '% done';
      })
      
      .on('end', function () {
        console.log('\nFinished!');
        res.send("\nIt's done!!! and result is: " + result)
      })
      .audioCodec('libmp3lame') // Audio Codec
      .videoCodec('libx264')
      .mergeToFile(save, temp)

    // res.send("It's done!!! and result is: "+result)
  })

module.exports = router;