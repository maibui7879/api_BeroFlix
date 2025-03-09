const express = require("express");
const cors = require("cors");
const accountRoutes = require("./api/accountRoutes");

const app = express();
app.use(cors({
    origin: ["http://localhost:3000", "https://your-frontend.vercel.app"],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
  }));
app.use(express.json());
app.use((req, res, next) => {
    console.log("Headers:", req.headers);
    next();
  });
app.use("/api/accounts", accountRoutes);

app.get("/", (req, res) => res.send("Account API is running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
