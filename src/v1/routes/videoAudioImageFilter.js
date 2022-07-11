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
        var image = 'public/orignal/background.jpg'
        var image2 = 'public/orignal/bg2.jpg'
        var image3 = 'public/orignal/bg3.jpg'
        var pathmusic = 'public/orignal/Instrumental1.mp3'
        var save = 'public/save/testimageaudioFilter-480p.mp4'
        var temp = 'public/temp'
        var result = ""
        var font = 'public/orignal/Anton-Regular.ttf'

        mergedVideo.input(video1)
            .input(video2)
            .input(image2)
            .input(pathmusic)
            .complexFilter(
                [
                    
                    {
                        "filter": "concat",
                        "inputs": "[0:v][1:v]",
                        "outputs": "tmp"
                    },
                    {
                        "filter": "scale",
                        "options": {
                            "w": "1080",
                            "h": "720",
                        },
                        "inputs": "tmp",
                        "outputs": "tmp"
                    },
                   
                    {
                        "filter": "overlay",
                        "options": {
                            "enable": "between(t,15,17)",
                            "x": "100",
                            "y": "100"
                        },
                        "inputs": "[tmp][2:v]",
                        "outputs": "tmp"
                    },
                    //working
                    // {
                    //     "filter": "amix",
                    //     "inputs": "3",
                    //     "duration":"between(t,2,5)",

                    // },
                    //working
                    // {
                    //     "filter": "afade",
                    //     "options": {
                    //     "t":"in",
                    //     "st":"6",
                    //     "d": "20",
                    //     },
                    //     "inputs": "3",
                    // },
                   

                    {
                        "filter": "drawtext",
                        "options": {
                            "enable": "between(t,3,10)",
                            "text": "Hello this text for Testing.",
                            "fontsize":"20",
                            "fontcolor":"#FF0000",
                            "fontfile": font,
                            //"style": "Semibold",
                            "x": "mod(3*n\,w+tw)-tw",
                            "y": "(h)/2"
                        },
                        "inputs": "tmp",
                        "outputs": "tmp"
                    },



                ], 'tmp')
            //working
           // .inputOptions(["-itsoffset 00:00:12", '-vsync 0'])
           .inputOptions(['-vsync 0'])
            .outputOptions(["-map 3:a", "-async 1"])

            //videoFilters('fade=out:29:10')
            // .withFpsInput(30)
            // Specify a constant video bitrate
            //.withVideoBitrate('650k', true)
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