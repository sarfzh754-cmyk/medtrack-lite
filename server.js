const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let patients = [];

app.post("/add", (req, res) => {
  patients.push(req.body);
  res.json({ message: "Patient added" });
});

app.get("/patients", (req, res) => {
  res.json(patients);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});