const express = require('express');

const app = express();

// Built-in middleware
app.use(express.json());

// POST route
app.post('/users', (req, res) => {

    console.log(req.body);

    res.json({
        message: "User received",
        user: req.body
    });

});

app.listen(8000, () => {
    console.log("Server running on port 8000");
}   );