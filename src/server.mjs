// proxy-server.js
import express from "express";
import axios from "axios";
import cors from "cors";

// Create an Express application
const app = express();
// Define the port for the server to listen on
const PORT = process.env.PORT || 4000;
// Enable CORS middleware
app.use(cors());
// Endpoint to fetch ports data from the external API
app.get("/fetchPorts", async (req, res) => {
  try {
    const response = await axios.get(
      "https://europe-west2-carbon-emission-mvp.cloudfunctions.net/fetchPorts"
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching ports:", error.message);
    res.status(error.response?.status || 500).send("Error fetching ports");
  }
});
// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
