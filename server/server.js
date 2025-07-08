require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/database");

// Connect to database
connectDB();

const PORT = process.env.PORT || 10000;
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'

app.listen(PORT, HOST, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});


// module.exports = server;