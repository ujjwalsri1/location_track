const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON data from the request body
app.use(express.json());

// Serve the static HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to handle form submission and store data in a JSON file
app.post('/submit', (req, res) => {
  const userData = req.body;

  // Define the path for the JSON file
  const filePath = path.join(__dirname, 'data.json');
  
  // Read the existing JSON file (or initialize as an empty array)
  let data = [];
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  // Add the new user data
  data.push(userData);

  // Write updated data back to the file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  
  // Send a response back to the client
  res.json({ message: 'Data saved successfully!', userData });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
