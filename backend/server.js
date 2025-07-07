const express = require ("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv")
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/password", require("./routes/passwordRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
