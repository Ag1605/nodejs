
const express = require('express');

const app = express();

app.use(express.json());

// Temporary user data
let users = [
    { id: 1, name: "Akshat", age: 25 },
    { id: 2, name: "Rahul", age: 24 }
];

// GET - Get all users
app.get('/api/users', (req, res) => {

    res.status(200).json({
        success: true,
        users: users
    });

});

// GET - Get one user
app.get('/api/users/:id', (req, res) => {

    const id = Number(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);

});

// POST - Create user
app.post('/api/users', (req, res) => {

    const { name, age } = req.body;

    if (!name || age === undefined) {
        return res.status(400).json({
            message: "Name and age are required"
        });
    }

    const newUser = {
        id: users.length > 0
            ? Math.max(...users.map(u => u.id)) + 1
            : 1,
        name: name,
        age: age
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created",
        user: newUser
    });

});

// PUT - Replace user
app.put('/api/users/:id', (req, res) => {

    const id = Number(req.params.id);

    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const { name, age } = req.body;

    if (!name || age === undefined) {
        return res.status(400).json({
            message: "Name and age are required"
        });
    }

    users[index] = { id, name, age };

    res.json({
        message: "User replaced",
        user: users[index]
    });

});

// PATCH - Partially update user
app.patch('/api/users/:id', (req, res) => {

    const id = Number(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const { name, age } = req.body;

    if (name !== undefined) user.name = name;
    if (age !== undefined) user.age = age;

    res.json({
        message: "User updated",
        user: user
    });

});

// DELETE - Delete user
app.delete('/api/users/:id', (req, res) => {

    const id = Number(req.params.id);

    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const deletedUser = users.splice(index, 1)[0];

    res.json({
        message: "User deleted",
        user: deletedUser
    });

});

// Start server
app.listen(8000, () => {
    console.log("REST API running on port 8000");
});
