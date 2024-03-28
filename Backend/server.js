const express = require("express");
const mongoose = require("mongoose");
const ItemRoute = require("./Routes/ItemRoute.js")
const connectDB = require("./Config/db.js")
const dotenv = require("dotenv")
const cors = require("cors");
const app = express();

dotenv.config(); 
connectDB();

app.use(cors());
app.use(express.json());

//Routes
app.use('/items',ItemRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
 