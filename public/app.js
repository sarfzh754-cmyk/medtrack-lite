const form = document.getElementById("patientForm");
const list = document.getElementById("patientList");
const search = document.getElementById("search");

let patients = JSON.parse(localStorage.getItem("patients")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const patient = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    status: document.getElementById("status").value,
    symptoms: document.getElementById("symptoms").value,
    diagnosis: document.getElementById("diagnosis").value,
    prescription: document.getElementById("prescription").value,
    date: new Date().toLocaleDateString()
  };

  patients.unshift(patient);
  saveData();
  form.reset();
  renderPatients();
});

search.addEventListener("input", renderPatients);

function saveData() {
  localStorage.setItem("patients", JSON.stringify(patients));
}

function renderPatients() {
  const keyword = search.value.toLowerCase();

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(keyword) ||
    p.symptoms.toLowerCase().includes(keyword) ||
    p.diagnosis.toLowerCase().includes(keyword)
  );

  list.innerHTML = "";

  filtered.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "patient-card";

    card.innerHTML = `
      <div class="patient-top">
        <h3>${p.name}</h3>
        <span class="badge ${p.status}">${p.status}</span>
      </div>

      <p><strong>Age/Gender:</strong> ${p.age} / ${p.gender}</p>
      <p><strong>Symptoms:</strong> ${p.symptoms}</p>
      <p><strong>Diagnosis:</strong> ${p.diagnosis}</p>
      <p><strong>Prescription:</strong> ${p.prescription}</p>
      <p><strong>Date:</strong> ${p.date}</p>

      <button class="delete" onclick="deletePatient(${patients.indexOf(p)})">
        Delete Record
      </button>
    `;

    list.appendChild(card);
  });

  updateStats();
}

function deletePatient(index) {
  patients.splice(index, 1);
  saveData();
  renderPatients();
}

function updateStats() {
  document.getElementById("totalPatients").textContent = patients.length;
  document.getElementById("criticalPatients").textContent =
    patients.filter(p => p.status === "Critical").length;
  document.getElementById("stablePatients").textContent =
    patients.filter(p => p.status === "Stable").length;
}

renderPatients();
