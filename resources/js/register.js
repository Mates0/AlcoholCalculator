import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { validateRegister } from "./validate_register.js";
import firebaseConfig from "./firebaseConfig/firebaseConfig.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);

let emailInput = document.getElementById("email-input")
let passwordInput = document.getElementById("password-input")
let repeatEmailInput = document.getElementById("wrong-email-placeholder")
let repeatPasswordInput = document.getElementById("repeat-password-input")
let registerBtn = document.getElementById("register-btn")
let wrongPassword = document.getElementById("wrong-password-placeholder");


let registerAndSignInUser = evt => {
    evt.preventDefault()

    const email = emailInput.value;
    const password = passwordInput.value;
    const repeatPassword = repeatPasswordInput.value;

    if (!validateRegister(email, password, repeatPassword)) {
        return;
    }

    registerBtn.innerHTML = "Registrování..."

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    set(ref(db, 'users/' + userCredentials.user.uid), {
                        email: email
                    }).then(() => {
                        sessionStorage.setItem("user-info", JSON.stringify({email: email, uid: userCredentials.user.uid}));
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
            console.error(errorCode, errorMessage);
            registerBtn.innerHTML = "Registrovat se"
            if (errorCode === "auth/email-already-in-use") {
                repeatEmailInput.className = "d-block";
                repeatEmailInput.innerHTML = "E-mail je již používán"
                emailInput.style.borderBottom = "1px solid red";
            }
        });
}

registerBtn.addEventListener("click", registerAndSignInUser);

