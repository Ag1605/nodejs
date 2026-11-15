
const http = require('http');

const server = http.createServer((req, res) => {

    // Parse the requested URL
    const myURL = new URL(req.url, 'http://localhost:8000');

    // Get pathname
    const pathname = myURL.pathname;

    // Get query parameters
    const name = myURL.searchParams.get('name');

    // Home route
    if (pathname === '/') {

        res.end("Welcome to Home Page");

    }

    // About route
    else if (pathname === '/about') {

        res.end("Welcome to About Page");

    }

    // User route
    else if (pathname === '/user') {

        res.end(`Welcome ${name || 'Guest'}`);

    }

    // Unknown route
    else {

        res.statusCode = 404;
        res.end("Page Not Found");

    }

});

server.listen(8000, () => {
    console.log("Server running on port 8000");
});
