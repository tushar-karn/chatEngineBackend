const express = require("express");
const cors = require("cors");
const axios = require("axios");
require('dotenv').config()

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Authentication endpoint
app.post("/authenticate", async (req, res) => {
  try {
    // Extract username from request body
    const { username } = req.body;
    
    // Make a PUT request to ChatEngine API to create or update user
    const response = await axios.put(
      "https://api.chatengine.io/users/",
      { username, secret: username, first_name: username },
      { headers: { "private-key": "6758f486-d9ab-4d84-a88f-235af3a3fcef" } }
    );
    
    // Send back the response from ChatEngine API
    res.status(response.status).json(response.data);
  } catch (error) {
    // If there's an error, send back the error response
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      // If the error is not from the API response, send a generic error
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
