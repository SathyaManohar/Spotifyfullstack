const express = require("express");
const cors = require("cors");
const { songrouter } = require('./src/routes/songroutes');
const { connectmongodb } = require('./src/config/mongodb');
const { connectcloudinary } = require('./src/config/cloudinary');
const { albumrouter } = require("./src/routes/albumroute");
const path = require('path');  // For serving static files
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 7000;

// MongoDB and Cloudinary setup
connectmongodb().then(() => console.log("MongoDB connected")).catch((error) => console.log("Error during connection with MongoDB"));
connectcloudinary();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());  // To connect frontend and backend if they are on different ports

// API routes
app.use('/api/song', songrouter);
app.use('/api/album', albumrouter);

// Serve React static files in production
if (process.env.NODE_ENV === 'production') {
    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, 'client/build')));

    // All other routes will be handled by React Router
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Server started at port ${port}`));
