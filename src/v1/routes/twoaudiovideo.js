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
        var pathmusic2 = 'public/orignal/audio2.mp3'
        var pathmusic3 = 'public/orignal/audio3.mp3' // 5 sec
        var pathmusic4 = 'public/orignal/audio4.mp3' // 3 sec
        var save = 'public/save/transition-480p.mp4'
        var temp = 'public/temp'
        var result = ""
        // var font = 'public/orignal/Anton-Regular.ttf'

        mergedVideo.input(video1)
        .input(pathmusic3)
        .input(pathmusic4)
            .complexFilter(
                [
                    "[1][2]amix=inputs=2[a]"
                    
                ])
            //working
            .inputOptions([ '-vsync 0'])
            //.inputOptions(['-vsync 0'])

            .outputOptions(["-map 0:v",'-map "[a]"','-c:v copy',"-async 1"])
            .videoCodec("libx264")
            //videoFilters('fade=out:29:10')
            // .withFpsInput(30)
            // Specify a constant video bitrate
            .withVideoBitrate('650k', true)
            // Specify video bitrate in kbps (the 'k' is optional)
            //.size('1280x720')
            .on('error', function (err) {
                console.log('Error ' + err);
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