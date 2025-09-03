const express = require('express');
const app = express();
const PORT = 5000;

// Root route
app.get('/', (req, res) => {
    res.send('API working');
});

// Vendors route
app.get('/vendors', (req, res) => {
    const vendors = [
        { id: 1, name: "ABC Bakers", category: "Bakers", address: "MG Road" },
        { id: 2, name: "Handmade Hub", category: "Artisans", address: "Main Market" },
        { id: 3, name: "Novelty Books", category: "Bookstore", address: "City Center" }
    ];
    res.json(vendors);  
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
