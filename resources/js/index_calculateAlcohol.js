import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getDatabase, get, ref, set} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import {validateCalculation} from "./validate_index.js";
import firebaseConfig from "./firebaseConfig/firebaseConfig.js";

const app = initializeApp(firebaseConfig);

export function calculateAlcohol(addedAlcohol) {
    let weight = document.getElementById("weightForm").value
    let gender = document.getElementById("genderForm").value
    let timeInput = document.getElementById("timeForm").value;
    let addButton = document.getElementById("add-To-List");

    if (!validateCalculation(weight,timeInput,addedAlcohol)) {
        return;
    }

    localStorage.setItem('inputValue', weight);
    localStorage.setItem("selectedGender", gender)
    localStorage.setItem('selectedTime', timeInput);
    localStorage.setItem('timeAndVolume', JSON.stringify(addedAlcohol));

    let userCreds = JSON.parse(sessionStorage.getItem("user-creds"));

    if (userCreds) {
        saveSessionStorageToUserProfile(userCreds, addedAlcohol)
            .then(() => {
                window.location.href = 'graphPage.html';
            })
            .catch((error) => {
                console.error("Error saving data:", error);
            });
    } else {
        window.location.href = 'graphPage.html';
    }
}

function saveSessionStorageToUserProfile(userCreds, addedAlcohol) {
    const db = getDatabase();

    const userProfileRef = ref(db, 'users/' + userCreds.uid + '/historyOfCalculatedAlcohol');

    return get(userProfileRef)
        .then((snapshot) => {
            const currentData = snapshot.val() || [];

            addedAlcohol.dateTime = new Date().toISOString();
            currentData.push(addedAlcohol);

            return set(userProfileRef, currentData);

        }).catch((error) => {
        console.error("Error saving data to user profile:", error);
    });
}

