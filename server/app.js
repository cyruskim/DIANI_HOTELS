const express = require('express');
const app = express();
const { Pool } = require('pg');
const fs = require('fs');
const csvParser = require('csv-parser');

// PostgreSQL database configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'map_app_db',
  password: 'postgres',
  port: 5432,
});

// Parse the CSV data and populate the database
fs.createReadStream('C:/Users/user/OneDrive/5.1/WEB MAPPING/PRACS/PRAC3/map-app/data/points_of_interest_data.csv')
  .pipe(csvParser())
  .on('data', (row) => {
    const { name, latitude, longitude } = row;
    pool.query(
      'INSERT INTO points_of_interest (name, latitude, longitude) VALUES ($1, $2, $3)',
      [name, latitude, longitude],
      (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
        }
      }
    );
  })
  .on('end', () => {
    console.log('CSV data successfully processed and inserted into the database.');
  });

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
// ...

app.get('/get_points_of_interest', (req, res) => {
  pool.query('SELECT * FROM points_of_interest', (err, result) => {
    if (err) {
      console.error('Error fetching data from the database:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result.rows);
    }
  });
});

// ...
