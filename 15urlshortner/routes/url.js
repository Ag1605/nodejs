
const express = require('express');
const router = express.Router();

const {
    handleGenerateShortUrl,handleGetOriginalUrl
} = require('../controllers/url');

router.post("/", handleGenerateShortUrl);
// Redirect using short ID
router.get("/:shortid", handleGetOriginalUrl);

module.exports = router;
