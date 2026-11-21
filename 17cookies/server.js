
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());


// 1. CREATE COOKIE
app.get("/create-cookie", (req, res) => {

    res.cookie("username", "Akshat", {
        maxAge: 60 * 60 * 1000
    });

    res.send("Cookie created");

});


// 2. READ COOKIE
app.get("/read-cookie", (req, res) => {

    const username = req.cookies.username;

    res.json({
        username: username
    });

});


// 3. UPDATE COOKIE
app.get("/update-cookie", (req, res) => {

    res.cookie("username", "Akshat Goel", {
        maxAge: 60 * 60 * 1000
    });

    res.send("Cookie updated");

});


// 4. DELETE COOKIE
app.get("/delete-cookie", (req, res) => {

    res.clearCookie("username");

    res.send("Cookie deleted");

});


// 5. CREATE SECURE COOKIE
app.get("/secure-cookie", (req, res) => {

    res.cookie("secureToken", "sample123", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 1000,
        path: "/"
    });

    res.send("Secure cookie created");

});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});
