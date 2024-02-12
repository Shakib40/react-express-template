const express = require('express');
const router = express.Router();

const FILE_CONTROLLER = require('../controllers/file.controller');

router.get('/convert-into-pdf', FILE_CONTROLLER.DOWNLOAD_PDF);
router.get('/convert-into-png', FILE_CONTROLLER.DOWNLOAD_PNG);

module.exports = router;