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
       
        var image = 'public/orignal/background.jpg'
        var image2 = 'public/orignal/bg2.jpg'
        var image3 = 'public/orignal/bg3.jpg'
        var pathmusic = 'public/orignal/Instrumental1.mp3'
        var save = 'public/save/testAudio1.mp4'
        var temp = 'public/temp'
        var result = ""



        mergedVideo.input(video1)
            .addInput(pathmusic)
            .addOptions([
                "-strict -2"
             ])
             
          .outputOptions(["-map 0:v:0","-map 1:a:0","-c copy"])
          .on('stderr', (stderrLine) => console.log('conversion: ' + stderrLine))
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
           
            .save(save, temp)

        // res.send("It's done!!! and result is: "+result)
    })

module.exports = router;