// module.exports = {
//   Database: "mongodb://localhost:27017/shopdb",
// };

const mongoose = require("mongoose");
require("dotenv").config();
const server = process.env.HOST;
const port = process.env.DB_PORT;
const database = process.env.DATABASE;

const connectionToDb = async () => {
  try {
    await mongoose.connect(`mongodb://${server}:${port}/${database}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false, ==>nuk po funksionojn
      // useCreateIndex: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.log("failing to connect to database.");
  }
};

connectionToDb();
