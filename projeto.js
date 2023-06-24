// Simulação de dados de médicos
const doctors = [
  { id: 1, name: "Dr. João Silva", specialty: "Clínico Geral", availableDates: ["2023-06-18", "2023-06-19"], teleconsultation: true },
  { id: 2, name: "Dra. Maria Souza", specialty: "Dermatologista", availableDates: ["2023-06-18", "2023-06-20"], teleconsultation: false },
  { id: 3, name: "Dr. Carlos Santos", specialty: "Cardiologista", availableDates: ["2023-06-19", "2023-06-21"], teleconsultation: true }
];

// Função para exibir os resultados da pesquisa
function showSearchResults(results) {
  const searchResults = document.getElementById("search-results");
  searchResults.innerHTML = "";

  if (results.length === 0) {
    searchResults.innerHTML = "<p>Nenhum médico encontrado.</p>";
  } else {
    results.forEach(doctor => {
      const doctorCard = document.createElement("div");
      doctorCard.classList.add("doctor-card");

      const doctorInfo = document.createElement("p");
      doctorInfo.textContent = `${doctor.name} - ${doctor.specialty}`;

      const appointmentButton = document.createElement("button");
      appointmentButton.textContent = "Marcar Consulta";
      appointmentButton.addEventListener("click", () => {
        showConfirmationArea(doctor);
      });

      doctorCard.appendChild(doctorInfo);
      doctorCard.appendChild(appointmentButton);
      searchResults.appendChild(doctorCard);
    });
  }
}

// Função para exibir a área de confirmação de consulta
function showConfirmationArea(doctor) {
  const confirmationArea = document.getElementById("confirmation-area");
  confirmationArea.innerHTML = "";

  const confirmationMessage = document.createElement("p");
  confirmationMessage.textContent = `Você está prestes a marcar uma consulta com ${doctor.name}. Selecione uma data disponível:`;

  const dateSelect = document.createElement("select");
  doctor.availableDates.forEach(date => {
    const option = document.createElement("option");
    option.value = date;
    option.textContent = date;
    dateSelect.appendChild(option);
  });

  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Confirmar Consulta";
  confirmButton.addEventListener("click", () => {
    showAppointmentConfirmation(doctor, dateSelect.value);
  });

  confirmationArea.appendChild(confirmationMessage);
  confirmationArea.appendChild(dateSelect);
  confirmationArea.appendChild(confirmButton);
}

// Função para exibir a confirmação da consulta
function showAppointmentConfirmation(doctor, date) {
  const confirmationArea = document.getElementById("confirmation-area");
  confirmationArea.innerHTML = "";

  const successMessage = document.createElement("p");
  successMessage.classList.add("message", "success");
  successMessage.textContent = `Consulta marcada com sucesso!`;

  const prescriptionLink = document.createElement("a");
  prescriptionLink.href = "caminho/para/prescricao.pdf";
  prescriptionLink.textContent = "Baixar Prescrição";

  const teleconsultationMessage = document.createElement("p");
  teleconsultationMessage.textContent = doctor.teleconsultation ? "Esta consulta será realizada por teleconsulta." : "";

  confirmationArea.appendChild(successMessage);
  confirmationArea.appendChild(prescriptionLink);
  confirmationArea.appendChild(teleconsultationMessage);
}

// Evento de envio do formulário de cadastro
const registrationForm = document.getElementById("registration-form");
registrationForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Impede o comportamento padrão do envio do formulário

  const fullName = document.getElementById("full-name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const birthdate = document.getElementById("birthdate").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const language = document.getElementById("language").value;

  // Aqui você pode implementar a lógica para enviar os dados do cadastro para o servidor

  // Exemplo de exibição de mensagem de sucesso
  const registrationSuccessMessage = document.createElement("p");
  registrationSuccessMessage.classList.add("message", "success");
  registrationSuccessMessage.textContent = "Cadastro realizado com sucesso!";
  registrationForm.appendChild(registrationSuccessMessage);
});

// Evento de busca de médicos
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", () => {
  const searchInput = document.getElementById("search-input").value;
  const results = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchInput.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchInput.toLowerCase())
  );
  showSearchResults(results);
});