const allowedOrigins = [
  "https://google.com",
  "http://127.0.0.1:550",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:4000",
  "http://192.168.56.1:3000",
  "http://localhost:8000",
  "http://127.0.0.1:5173",
  "http://localhost:5173",
  "http://localhost:5174",
  `http://localhost:${process.env.PORT}`,
  "*"
];

module.exports = allowedOrigins;
