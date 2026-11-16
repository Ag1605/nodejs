
const express = require('express');

const app = express();

const PORT = 8000;

// Middleware to read JSON data
app.use(express.json());

// Temporary database (array)
let users = [
    {
        id: 1,
        name: "Akshat",
        age: 25,
        city: "Delhi"
    },
    {
        id: 2,
        name: "Rahul",
        age: 24,
        city: "Mumbai"
    },
    {
        id: 3,
        name: "Aman",
        age: 23,
        city: "Noida"
    }
];

// ======================================
// 1. GET - Get all users
// ======================================

app.get('/users', (req, res) => {

    res.status(200).json({
        message: "All users fetched successfully",
        users: users
    });

});

// ======================================
// 2. GET - Get single user by ID
// ======================================

app.get('/users/:id', (req, res) => {

    const id = Number(req.params.id);

    const user = users.find((u) => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json({
        message: "User found",
        user: user
    });

});

// ======================================
// 3. POST - Create a new user
// ======================================

app.post('/users', (req, res) => {

    const { name, age, city } = req.body;

    // Basic validation
    if (!name || age === undefined || !city) {
        return res.status(400).json({
            message: "Please provide name, age and city"
        });
    }

    const newUser = {
        id: users.length > 0
            ? Math.max(...users.map(u => u.id)) + 1
            : 1,
        name: name,
        age: age,
        city: city
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created successfully",
        user: newUser
    });

});

// ======================================
// 4. PUT - Replace complete user
// ======================================

app.put('/users/:id', (req, res) => {

    const id = Number(req.params.id);

    const { name, age, city } = req.body;

    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    if (!name || age === undefined || !city) {
        return res.status(400).json({
            message: "Provide name, age and city"
        });
    }

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

});

// ======================================
// 5. PATCH - Update partial user details
// ======================================

app.patch('/users/:id', (req, res) => {

    const id = Number(req.params.id);

    const user = users.find((u) => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const { name, age, city } = req.body;

    if (name !== undefined) user.name = name;
    if (age !== undefined) user.age = age;
    if (city !== undefined) user.city = city;

    res.status(200).json({
        message: "User updated successfully",
        user: user
    });

});

// ======================================
// 6. DELETE - Delete user
// ======================================

app.delete('/users/:id', (req, res) => {

    const id = Number(req.params.id);

    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const deletedUser = users.splice(index, 1)[0];

    res.status(200).json({
        message: "User deleted successfully",
        user: deletedUser
    });

});

// ======================================
// Start Express server
// ======================================

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
