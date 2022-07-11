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
        // var image = 'public/orignal/background.jpg'
        // var image2 = 'public/orignal/bg2.jpg'
        // var image3 = 'public/orignal/bg3.jpg'
        // var pathmusic = 'public/orignal/Instrumental1.mp3'
        var save = 'public/save/transition-480p.mp4'
        var temp = 'public/temp'
        var result = ""
        // var font = 'public/orignal/Anton-Regular.ttf'

        mergedVideo.input(video1)
            .input(video2)
            .complexFilter(
                [

                    "[0:v]settb=AVTB,fps=30/1[v0]",
                    "[1:v]settb=AVTB,fps=30/1[v1]",
                    {
                        "filter": "xfade",
                        "options": {
                            "transition": "hlslice",
                            "offset": "10",
                            "duration": "2",
                        },

                        "inputs": "[v0][v1]",
                        "outputs": "tmp"
                    },
                    
                ], 'tmp')
            //working
            .inputOptions(["-itsoffset 00:00:12", '-vsync 0'])
            //.inputOptions(['-vsync 0'])

            .outputOptions(["-async 1","-pix_fmt yuv420p"])
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