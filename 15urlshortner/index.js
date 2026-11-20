
const express = require("express");
const dotenv = require("dotenv");

const { connect } = require("./connect");
const urlRoute = require("./routes/url");

dotenv.config();

const app = express();

// Middleware to read JSON request bodies
app.use(express.json());

// Register URL routes
app.use("/url", urlRoute);

// Test route
app.get("/", (req, res) => {
    res.send("URL Shortener Server is running");
});

// Start server after MongoDB connects
async function startServer() {
    try {
        await connect(process.env.MONGO_URI);

        console.log("MongoDB Connected Successfully");

        const PORT = process.env.PORT || 8001;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
}

startServer();
