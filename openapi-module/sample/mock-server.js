const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const users = [
    { id: 1, name: 'Yujun Liu', email: 'someemail@example.com' },
    { id: 2, name: 'Wade Wilson', email: 'someemail@example.com' }
];

// GET /users
app.get('/users', (req, res) => {
    const { limit } = req.query;
    if (limit) {
        return res.json(users.slice(0, limit));
    }
    res.json(users);
});

// POST /users
app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});

// GET /users/:id
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Mock server running at http://localhost:${port}`);
});