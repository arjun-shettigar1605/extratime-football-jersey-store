require("dotenv").config();

console.log("=== Raw Environment Check ===");
console.log(
  "All env vars:",
  Object.keys(process.env).filter(
    (key) =>
      key.includes("MONGO") || key.includes("PORT") || key.includes("JWT")
  )
);
console.log("MONGODB_URI value:", JSON.stringify(process.env.MONGODB_URI));
console.log("MONGODB_URI type:", typeof process.env.MONGODB_URI);
console.log(
  "MONGODB_URI length:",
  process.env.MONGODB_URI ? process.env.MONGODB_URI.length : "undefined"
);
