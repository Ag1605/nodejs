
const http = require('http');

// Create HTTP server
const server = http.createServer((req, res) => {

    res.end("Hello World");

});

// Start server on port 8000
server.listen(8000, () => {
    console.log("Server is running on port 8000");
});
