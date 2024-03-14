import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getDatabase, get, ref, set} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import firebaseConfig from "./firebaseConfig/firebaseConfig.js";
const app = initializeApp(firebaseConfig);

window.addEventListener('DOMContentLoaded', (event) => {
    let userCreds = JSON.parse(sessionStorage.getItem('user-creds'));
    let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
    let logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', function () {
        signOut();
    })
    let signOut = () => {
        sessionStorage.removeItem('user-creds');
        sessionStorage.removeItem('user-info');
        window.location.href = 'index.html';
    }

    const db = getDatabase();
    const userProfileRef = ref(db, 'users/' + userCreds.uid + '/historyOfCalculatedAlcohol');

    let historyContainer = document.getElementById("history-container");
    let email = document.getElementById("email");

    email.innerHTML = "Email: " + userCreds.email;

    get(userProfileRef)
        .then((snapshot) => {
            const userData = snapshot.val();
            console.log(userData)
            if (userData) {
                displayHistory(userData);
            } else {
                displayMessage("Žádná data k zobrazení.");
            }
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
            displayMessage("Error fetching user data.");
        });
});

function displayHistory(historyData) {
    const historyContainer = document.getElementById("history-container");

    historyData.forEach((entry, index) => {
        const card = document.createElement("div");
        card.classList.add("card", "bg-dark", "d-flex", "justify-content-center");

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const dateTime = document.createElement("p");
        dateTime.textContent = "Datum kalkulace: " + new Date(entry.dateTime).toLocaleString();
        dateTime.classList.add("text-white");
        cardBody.appendChild(dateTime);

        const table = document.createElement("table");
        table.classList.add("table", "table-dark");

        // Create table header
        const tableHeader = document.createElement("thead");
        const headerRow = document.createElement("tr");
        const headers = ["Název alkoholu", "% Alkoholu", "Objem (l)", "Čas konzumace"];
        headers.forEach(headerText => {
            const th = document.createElement("th");
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        tableHeader.appendChild(headerRow);
        table.appendChild(tableHeader);

        // Create table body
        const tableBody = document.createElement("tbody");
        for (const key in entry) {
            if (key !== "dateTime") {
                const item = entry[key];
                const row = document.createElement("tr");
                const rowData = [item.name, item.alcoholContent, item.volume, item.timeOfConsumption];
                rowData.forEach(data => {
                    const td = document.createElement("td");
                    td.textContent = data;
                    row.appendChild(td);
                });
                tableBody.appendChild(row);
            }
        }
        table.appendChild(tableBody);

        cardBody.appendChild(table);
        card.appendChild(cardBody);

        historyContainer.appendChild(card);
    });
}



function displayMessage(message) {
    const historyContainer = document.getElementById("history-container");
    historyContainer.textContent = message;
}



