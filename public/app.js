const form = document.getElementById("patientForm");
const list = document.getElementById("patientList");

let patients = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const patient = {
    name: name.value,
    age: age.value,
    symptoms: symptoms.value
  };

  patients.push(patient);
  render();

  form.reset();
});

function render(){
  list.innerHTML = "";

  patients.forEach((p,index)=>{
    const li = document.createElement("li");

    li.innerHTML = `
      <span>
        <strong>${p.name}</strong><br>
        Age: ${p.age} | Symptoms: ${p.symptoms}
      </span>
      <button class="deleteBtn" onclick="removePatient(${index})">Delete</button>
    `;

    list.appendChild(li);
  });
}

function removePatient(index){
  patients.splice(index,1);
  render();
}