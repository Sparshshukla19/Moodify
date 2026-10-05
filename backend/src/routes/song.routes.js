const express = require('express');

const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const songController = require('../controllers/song.controller');

/**
 * POST /api/songs/
 */
router.post('/', upload.single('song'), songController.uploadSong);

/**
 * GET /api/songs/
 */
router.get('/', songController.getSong);

module.exports = router;