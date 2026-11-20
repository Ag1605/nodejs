
const shortId = require("shortid");
const Url = require("../models/url");

async function handleGenerateShortUrl(req, res) {

    const body = req.body;

    // Check if URL is provided
    if (!body.url) {
        return res.status(400).json({
            error: "url is required"
        });
    }

    // Generate unique short ID
    const shortid = shortId.generate();

    // Save URL in MongoDB
    await Url.create({
        shortid: shortid,
        redirectUrl: body.url,
        visitHistory: []
    });

    // Return generated short ID
    return res.json({
        id: shortid
    });
}

async function handleGetOriginalUrl(req, res) {

    const shortid = req.params.shortid;

    // Find URL using short ID
    const entry = await Url.findOne({
        shortid: shortid
    });

    // If URL doesn't exist
    if (!entry) {
        return res.status(404).json({
            error: "Short URL not found"
        });
    }

    // Redirect to original URL
    return res.redirect(entry.redirectUrl);
}

module.exports = {
    handleGenerateShortUrl,
    handleGetOriginalUrl
};
