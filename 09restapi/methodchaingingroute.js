
const express = require('express');

const app = express();

const PORT = 8000;

// Middleware to read JSON data
app.use(express.json());

// Temporary database
let users = [
    { id: 1, name: "Akshat", age: 25, city: "Delhi" },
    { id: 2, name: "Rahul", age: 24, city: "Mumbai" },
    { id: 3, name: "Aman", age: 23, city: "Noida" }
];

// ======================================
// ROUTE: /api/users
// ======================================

// GET - Get all users
app.route('/api/users')

    .get((req, res) => {

        res.status(200).json({
            message: "All users fetched successfully",
            users: users
        });

    })

    // POST - Create a new user
    .post((req, res) => {

        const { name, age, city } = req.body;

        // Validate input
        if (!name || age === undefined || !city) {
            return res.status(400).json({
                message: "Please provide name, age and city"
            });
        }

        // Create new user
        const newUser = {
            id: users.length > 0
                ? Math.max(...users.map(user => user.id)) + 1
                : 1,
            name: name,
            age: age,
            city: city
        };

        // Add user to array
        users.push(newUser);

        res.status(201).json({
            message: "User created successfully",
            user: newUser
        });

    });

// ======================================
// ROUTE: /api/users/:id
// ======================================

app.route('/api/users/:id')

    // GET - Get single user
    .get((req, res) => {

        const id = Number(req.params.id);

        const user = users.find((user) => user.id === id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    })

    // PUT - Replace complete user
    .put((req, res) => {

        const id = Number(req.params.id);

        const index = users.findIndex((user) => user.id === id);

        if (index === -1) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const { name, age, city } = req.body;

        if (!name || age === undefined || !city) {
            return res.status(400).json({
                message: "Please provide name, age and city"
            });
        }

        // Replace complete user
        users[index] = {
            id: id,
            name: name,
            age: age,
            city: city
        };

        res.status(200).json({
            message: "User replaced successfully",
            user: users[index]
        });

    })

    // PATCH - Update selected fields
    .patch((req, res) => {

        const id = Number(req.params.id);

        const user = users.find((user) => user.id === id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const { name, age, city } = req.body;

        // Update only provided fields
        if (name !== undefined) user.name = name;
        if (age !== undefined) user.age = age;
        if (city !== undefined) user.city = city;

        res.status(200).json({
            message: "User updated successfully",
            user: user
        });

    })

    // DELETE - Delete user
    .delete((req, res) => {

        const id = Number(req.params.id);

        const index = users.findIndex((user) => user.id === id);

        if (index === -1) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Remove user from array
        const deletedUser = users.splice(index, 1)[0];

        res.status(200).json({
            message: "User deleted successfully",
            user: deletedUser
        });

    });

// ======================================
// Handle unknown routes
// ======================================

app.use((req, res) => {

    res.status(404).json({
        message: "API route not found"
    });

});

// ======================================
// Start server
// ======================================

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
