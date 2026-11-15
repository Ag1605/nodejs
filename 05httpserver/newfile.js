
const http = require('http');

// Create server
const server = http.createServer((req, res) => {

    // Home route
    if (req.url === '/') {

        res.end("Welcome to Home Page");

    }

    // About route
    else if (req.url === '/about') {

        res.end("Welcome to About Page");

    }

    // Contact route
    else if (req.url === '/contact') {

        res.end("Welcome to Contact Page");

    }

    // If route does not exist
    else {

        res.statusCode = 404;
        res.end("Page Not Found");

    }

});

// Start server
server.listen(3000, () => {
    console.log("Server running on port 3000");
});
