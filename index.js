// File: index.js
const express = require('express');

const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

// Visit http://localhost:3001/8
// app.get('/:id', (req, res) => {
   // console.log(req.params.id); // output
// });

// Visit http://localhost:3001/users/8/3
app.get('/users/:id/:user_id', (req, res) => {
    console.log(req.params.id); // output: 8
    console.log(req.params.user_id); // output: 3
});

app.get(
    '/users',
    (req, res) => {
        const id = req.query.id; // 123
        const username = req.query.username; // test

        res.send(`id: ${id}; username: ${username}`);
    },
);
