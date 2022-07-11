'use strict';
var express = require('express');
var router = express.Router();
var ffmpeg = require('ffmpeg');
//var ffmpeg = require('fluent-ffmpeg');


router.route('/:id?')
    .get(function (req, res) {

        var path = 'public/orignal/ForBiggerEscapes.mp4'
        var pathmusic = 'public/orignal/Instrumental1.mp3'
        var save = 'public/save/'
        try {
            var process = new ffmpeg(path);
            process.then(function (video) {
                // Callback mode
                video.fnExtractFrameToJPG(save, {
                    frame_rate: 1,
                    number: 5,
                    file_name: 'my_frame_%t_%s'
                }, function (error, files) {
                    if (!error)
                        console.log('Frames: ' + files);
                    else
                        console.log(error)
                });
                console.log("enter")
            }, function (err) {
                console.log('Error: ' + err);
            });

           // using fluent-ffmpeg
           /* ffmpeg(video1)
                .on('filenames', function (filenames) {
                    console.log('Will generate ' + filenames.join(', '))
                })
                .on('end', function () {
                    console.log('Screenshots taken');
                })
                .screenshots({
                    // Will take screens at 20%, 40%, 60% and 80% of the video
                    count: 4,
                    folder: save
                });

            ffmpeg(video1)
                .screenshots({
                    timestamps: [30.5, '50%', '01:10.123'],
                    filename: 'thumbnail-at-%s-seconds.png',
                    folder: save,
                    size: '320x240'
                });
            */
           // res.send("It's done!!!")

        } catch (e) {
    console.log(e.code);
    console.log(e.msg);
}
res.send("It's done!!!")
    })

module.exports = router;