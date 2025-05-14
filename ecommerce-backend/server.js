const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' folder inside 'ecommerce'

// Serve index.html as default
app.use(express.static(path.join(__dirname, '..', 'public')));


// MySQL connection
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'parimala05', // Replace with your actual MySQL password
  database: 'ecommerce_db'
});

// Test database connection
db.query('SELECT 1 + 1 AS solution', (err, result) => {
  if (err) {
    console.error('Connection test failed:', err);
  } else {
    console.log('Database connected!');
  }
});

// API route to get products
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Error querying database:', err.message);
      res.status(500).send('Error retrieving products');
    } else {
      res.json(results);  // Send products as JSON response
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
