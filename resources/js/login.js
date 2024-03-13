import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getDatabase, get, ref, child} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import {getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { validateLogin } from "./validate_login.js";
import firebaseConfig from "./firebaseConfig/firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);
const dbRef = ref(db);

let emailInput = document.getElementById("email-input")
let passwordInput = document.getElementById("password-input")
let loginBtn = document.getElementById("login-btn")
let wrongPassword = document.getElementById("wrong-password-placeholder");
let borderBottomPassword = document.getElementById("password-input");
let signInUser = evt => {
    evt.preventDefault()

    const email = emailInput.value;
    const password = passwordInput.value;

    if (!validateLogin(email, password)) {
        return;
    }

    loginBtn.innerHTML = "Přihlasování..."

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
            loginBtn.innerHTML = "Přihlásit se"
            if (errorCode === "auth/invalid-credential") {
                wrongPassword.className = "d-block";
                wrongPassword.innerHTML = "Nesprávné heslo nebo email"
                borderBottomPassword.style.borderBottom = "1px solid red";
            }
        });
}

loginBtn.addEventListener("click", signInUser)