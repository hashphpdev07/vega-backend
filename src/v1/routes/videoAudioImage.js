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
        var save = 'public/save/testimageaudio1.mp4'
        var temp = 'public/temp'
        var result = ""



        mergedVideo.input(video1)
            .addInput(image)
            .addInput(image2)
            .addInput(image3)
            .addInput(pathmusic)
            .addOptions([
                "-strict -2"
            ])

            .complexFilter(
                [
                    {
                        "filter": "overlay",
                        "options": {
                            "enable": "between(t,2,5)",
                            "x": "200",
                            "y": "200"
                        },
                        "inputs": "[0:v][1:v]",
                        "outputs": "tmp"
                    },
                    {
                        "filter": "overlay",
                        "options": {
                            "enable": "between(t,6,9)",
                            "x": "100",
                            "y": "100"
                        },
                        "inputs": "[tmp][2:v]",
                        "outputs": "tmp"
                    },
                    {
                        "filter": "overlay",
                        "options": {
                            "enable": "between(t,12,14)",
                            "x": "300",
                            "y": "400"
                        },
                        "inputs": "[tmp][3:v]",
                        "outputs": "tmp"
                    }
                ], 'tmp')
            //.audioCodec('libmp3lame')

            .outputOptions(["-map 4:a"])
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

            //.save(save, temp)
            .audioCodec('libmp3lame') // Audio Codec
            .videoCodec('libx264')
            .mergeToFile(save, temp)

        // res.send("It's done!!! and result is: "+result)
    })

module.exports = router;