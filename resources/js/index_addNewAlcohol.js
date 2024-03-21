import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getDatabase, ref, set} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import {validateCustomAlcohol} from "./validate_index.js";
import firebaseConfig from "./firebaseConfig/firebaseConfig.js";

const app = initializeApp(firebaseConfig);

let userCreds = JSON.parse(sessionStorage.getItem('user-creds'));

export function addNewAlcoholToLists(beers, wines, liquor) {
    let name = document.getElementById("alcohol-name").value;
    let alcoholContent = parseFloat(document.getElementById("percentage-of-alcohol").value);
    let type = document.getElementById("inputState").value;
    let beerSlider = document.getElementById("beer");
    let wineSlider = document.getElementById("wines");
    let liquorSlider = document.getElementById("liquor");

    if (!validateCustomAlcohol(name, alcoholContent)) {
        return;
    }
    let alcohol = {
        name: name,
        alcoholcontent: alcoholContent
    };

    if (type === "Piva") {
        beers.push(alcohol);
        beerSlider.click()
    }
    if (type === "Vína") {
        wines.push(alcohol);
        wineSlider.click()
    }
    if (type === "Tvrdý alkohol") {
        liquor.push(alcohol);
        liquorSlider.click()
    }

    if (userCreds) {
        saveCustomAlcoholListsToDatabase(beers, wines, liquor, userCreds.uid);
    }

    document.getElementById("alcohol-name").value = "";
    document.getElementById("percentage-of-alcohol").value = "";
    document.getElementById("inputState").selectedIndex = 0;
}

function saveCustomAlcoholListsToDatabase(beers, wines, liquor, userId) {
    const db = getDatabase();
    const userAlcoholListsRef = ref(db, `users/${userId}/customAlcoholLists`);

    const customAlcoholLists = {
        beers: beers,
        wines: wines,
        liquor: liquor
    };

    set(userAlcoholListsRef, customAlcoholLists)
        .then(() => {
            console.log("Custom alcohol lists saved to database");
        })
        .catch((error) => {
            console.error("Error saving custom alcohol lists to database:", error);
        });
}

