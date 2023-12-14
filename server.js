// app.js (or your Node.js script)
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
];

const products = [
    {
        id: 1,
        name: 'Elvis Live Ticket',
        price: 350.00,
        details: 'Live at Singapore Stadium!',
        date: 'March 1, 2024',
        image: 'https://i.etsystatic.com/10019178/r/il/93c0ad/5220800113/il_1588xN.5220800113_d8rs.jpg',
    },
    // Add more products as needed
];

const cart = [];

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/main.html', (req, res) => {
    res.sendFile(__dirname + '/main.html');
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.post('/buy', (req, res) => {
    const { itemName, itemPrice, quantity } = req.body;

    if (quantity > 0 ) {
        cart.push({
            itemName,
            itemPrice,
            quantity,
        });

        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

