import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getDatabase, get, ref, set, remove} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import firebaseConfig from "./firebaseConfig/firebaseConfig.js";

export function removeAlcoholFromDatabase() {
    const db = getDatabase();
    const alcoholRef = ref(db, `users/${userCreds.uid}/customAlcoholLists/wines/4`);
    remove(alcoholRef)
        .then(() => {
            console.log("Data removed from the database successfully.");
        })
        .catch((error) => {
            console.error("Error removing data from the database:", error);
        });
}