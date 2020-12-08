const monggose = require("mongoose");

const connectDB = async () => {
  await monggose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("database is connected");
};

module.exports = connectDB;
