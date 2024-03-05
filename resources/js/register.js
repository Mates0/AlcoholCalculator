// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { validateRegister } from "./validate_register.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6angt8_xASccfe0jBmuPjm0LM71jgoG4",
    authDomain: "alcoholcalculatorxd.firebaseapp.com",
    databaseURL: "https://alcoholcalculatorxd-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "alcoholcalculatorxd",
    storageBucket: "alcoholcalculatorxd.appspot.com",
    messagingSenderId: "701660401382",
    appId: "1:701660401382:web:736fd4dfdd08a17aecf527"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);

let emailInput = document.getElementById("email-input")
let passwordInput = document.getElementById("password-input")
let repeatPasswordInput = document.getElementById("repeat-password-input")
let registerBtn = document.getElementById("register-btn")

let registerAndSignInUser = evt => {
    evt.preventDefault()

    const email = emailInput.value;
    const password = passwordInput.value;
    const repeatPassword = repeatPasswordInput.value;

    if (!validateRegister(email, password, repeatPassword)) {
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    set(ref(db, 'users/' + userCredentials.user.uid), {
                        email: email
                    }).then(() => {
                        sessionStorage.setItem("user-creds", JSON.stringify(userCredentials.user));
                        window.location.href = 'index.html';
                    });
                })
                .catch((error) => {
                    console.error("Error signing in after registration:", error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error registering user:", errorCode, errorMessage);
        });
}

registerBtn.addEventListener("click", registerAndSignInUser);

