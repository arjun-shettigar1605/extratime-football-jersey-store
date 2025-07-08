const express = require("express");
const cors = require("cors");
require('dotenv').config();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/auth"); // Route imports
const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const adminRoutes = require("./routes/admin");

const app = express();
app.use(helmet()); // Security middleware

// Rate limiting to prevent DOS and spamming
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // window time of 15mins
  max: 100, // limit each IP to 100 requests in that window of 15min
});
app.use(limiter);



// CORS(Cross Origin Resource Sharing) allows only trusted domains to access API. Ex: frontend on port 5173 can talk to backend on port 5000
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://your-app-name.vercel.app", // Replace with your actual Vercel domain
        "https://extratime-football-jersey-store.vercel.app", // Example
        process.env.FRONTEND_URL, // Add this environment variable
      ];

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
// app.use(
//   cors({
//     origin:
//       process.env.NODE_ENV === "production"
//         ? "extratimestore.com" //replace with domain name when deployed.
//         : "http://localhost:5173",
//     credentials: true,
//     optionsSuccessStatus: 200,
//   })
// );

// allows backend to read JSON sent in the requests
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Maps all routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/admin', adminRoutes); //admin routes

// Health route to confirm the server is up(for testing)
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Error handler to catch errors(**should be last)
app.use(errorHandler);

module.exports = app;
