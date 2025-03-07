const express = require("express");
const cors = require("cors");
const accountRoutes = require("./api/accountRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/accounts", accountRoutes);

app.get("/", (req, res) => res.send("Account API is running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
