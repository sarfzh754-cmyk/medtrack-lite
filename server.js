<<<<<<< HEAD
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let patients = [];

app.post("/add", (req, res) => {
  const patient = {
    id: Date.now(),
    name: req.body.name,
    age: req.body.age,
    symptoms: req.body.symptoms,
    date: new Date().toLocaleString()
  };

  patients.push(patient);
  res.json({ message: "Patient added", patient });
});

app.get("/patients", (req, res) => {
  res.json(patients);
});

app.delete("/patients/:id", (req, res) => {
  const id = Number(req.params.id);
  patients = patients.filter((p) => p.id !== id);
  res.json({ message: "Patient deleted" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
=======
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

// 🔥 THIS LINE WAS MISSING (most important)
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
>>>>>>> b7835905a71aaa2ffe4d9e2200316b99497903e1
