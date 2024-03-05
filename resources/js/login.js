// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getDatabase, get, ref, child} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import {getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { validateLogin } from "./validate_login.js";
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
const dbRef = ref(db);

let emailInput = document.getElementById("email-input")
let passwordInput = document.getElementById("password-input")
let loginBtn = document.getElementById("login-btn")

let signInUser = evt => {
    evt.preventDefault()

    const email = emailInput.value;
    const password = passwordInput.value;

    if (!validateLogin(email, password)) {
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            get(child(dbRef, "users/" + userCredentials.user.uid)).then((snapshot) => {
                if (snapshot.exists()) {
                    sessionStorage.setItem("user-info", JSON.stringify({email: snapshot.val().email, uid: userCredentials.user.uid}));
                }
                sessionStorage.setItem("user-creds", JSON.stringify(userCredentials.user));
                window.location.href = 'index.html';
            }).catch((error) => {
                console.error(error);
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            alert(errorMessage)
            // ..
        });
}

loginBtn.addEventListener("click", signInUser)