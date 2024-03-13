import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getDatabase, get, ref, set} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import firebaseConfig from "./firebaseConfig/firebaseConfig.js";
const app = initializeApp(firebaseConfig);

window.addEventListener('DOMContentLoaded', (event) => {
    let userCreds = JSON.parse(sessionStorage.getItem('user-creds'));

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
        card.className = "card mb-3";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const dateTime = document.createElement("p");
        dateTime.textContent = "Datum kalkulace: " + new Date(entry.dateTime).toLocaleString();
        cardBody.appendChild(dateTime);

        for (const key in entry) {
            if (key !== "dateTime") {
                const item = entry[key];
                const paragraph = document.createElement("p");
                paragraph.textContent = `Název alkoholu: ${item.name}: ${item.alcoholContent} % Alkoholu, Objem: ${item.volume}(l), Čas konzumace: ${item.timeOfConsumption}`;
                cardBody.appendChild(paragraph);
            }
        }

        card.appendChild(cardBody);

        historyContainer.appendChild(card);
    });
}

function displayMessage(message) {
    const historyContainer = document.getElementById("history-container");
    historyContainer.textContent = message;
}



