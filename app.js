const express = require("express");
const connectDB = require("./DB/Connection");

require("dotenv").config();

connectDB();
const app = express();

// Using body parser middleware of express.js
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use("/api/posts", require("./api_db/posts"));
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
