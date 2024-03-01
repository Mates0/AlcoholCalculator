// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import {getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
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
let registerBtn = document.getElementById("register-btn")

let registerUser = evt => {
    evt.preventDefault()
    createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .then((userCredentials) => {
            set(ref(db, 'users/' + userCredentials.user.uid), {
                email: emailInput.value
            }).then(() => {
                window.location.href = 'index.html';
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            // ..
        });
}

registerBtn.addEventListener("click", registerUser)