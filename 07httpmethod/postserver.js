
const http = require('http');

// Create HTTP server
const server = http.createServer((req, res) => {

    // Check POST request and URL
    if (req.method === 'POST' && req.url === '/users') {

        // Empty string to store incoming data
        let body = '';

        // Receive data in chunks
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        // Execute when all data is received
        req.on('end', () => {

            // Convert JSON string into JavaScript object
            const user = JSON.parse(body);

            // Display user data in terminal
            console.log(user);

            // Send response to client
            res.writeHead(201, {
                'Content-Type': 'text/plain'
            });

            res.end("User received successfully");

        });

    }

    else {

        res.writeHead(404);
        res.end("Route not found");

    }

});

// Start server
server.listen(8000, () => {
    console.log("Server running on port 8000");
});
