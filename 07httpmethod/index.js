
const http = require('http');

const server = http.createServer((req, res) => {

    // GET method
    if (req.method === 'GET' && req.url === '/users') {

        res.end("Getting all users");

    }

    // POST method
    else if (req.method === 'POST' && req.url === '/users') {

        res.end("Creating a new user");

    }

    // PUT method
    else if (req.method === 'PUT' && req.url === '/users/1') {

        res.end("Replacing user details");

    }

    // PATCH method
    else if (req.method === 'PATCH' && req.url === '/users/1') {

        res.end("Updating user details");

    }

    // DELETE method
    else if (req.method === 'DELETE' && req.url === '/users/1') {

        res.end("Deleting user");

    }

    // Unknown route
    else {

        res.statusCode = 404;
        res.end("Route not found");

    }

});

server.listen(8000, () => {
    console.log("Server running on port 8000");
});
