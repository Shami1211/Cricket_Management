const express = require("express");
const mongoose = require("mongoose");
const RateRoute = require("./Routes/RateRoute.js")
const connectDB = require("./Config/db.js")
const dotenv = require("dotenv")
const cors = require("cors");
const app = express();

dotenv.config(); 
connectDB();

app.use(cors());
app.use(express.json());

//Routes
app.use('/rates', RateRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
 