const express = require("express");
const axios = require("axios");
const cors = require("cors"); // Import cors

const app = express();
const PORT = 5000;

// Enable CORS for requests from http://localhost:5173
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// Define the endpoint for proxying the request
app.get("/api/jobfair", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jobfair.nordeus.com/jf24-fullstack-challenge/test"
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching data from the external API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
