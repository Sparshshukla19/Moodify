const songModel = require('../models/song.model');
const id3 = require('node-id3');
const storageService = require('../services/storage.service');

async function uploadSong(req, res) {
   const songBuffer = req.file.buffer; // Get the song file buffer from the request object
   const { mood } = req.body; // Get the mood from the request body
   const tags = id3.read(songBuffer); // Read ID3 tags from the uploaded song file by using buffer return by multer memoryStorage

   const [songFile, posterFile] = await Promise.all([
      storageService.uploadFile({
         buffer: songBuffer,
         filename: tags.title + '.mp3',
         folder: 'cohort-2/moodify/songs'
      }),

      storageService.uploadFile({
         buffer: tags.image.imageBuffer,
         filename: tags.title + '.jpeg',
         folder: 'cohort-2/moodify/posters'
      })
   ])

   const song = await songModel.create({
      url: songFile.url,
      postUrl: posterFile.url,
      title: tags.title,
      mood: mood
   })
   res.status(201).json({
      message: 'Song uploaded successfully',
      song: song
   })
}

async function getSong(req,res){
   const { mood } = req.query;
   const song = await songModel.findOne({ mood });
   
   res.status(200).json({
      message: 'Song fetched successfully',
      song: song
   })
}

module.exports = { uploadSong,getSong };