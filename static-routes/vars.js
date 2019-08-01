import dotenv from "dotenv-safe";
dotenv.config();

console.info("process.env");
console.info(process.env);

module.exports = {
  mongoHost: process.env.MONGO_HOST,
  mongoPort: process.env.MONGO_PORT,
  mongoUser: process.env.MONGO_USER,
  mongoPassword: process.env.MONGO_PASSWORD,
  mongoDatabase: process.env.MONGO_DATABASE,
};
