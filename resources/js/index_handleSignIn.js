let userCreds = JSON.parse(sessionStorage.getItem('user-creds'));

let loggedIn = document.getElementById("logged-in-status")
let accountDetails = document.getElementById("profile-btn");

loggedIn.innerHTML = "Jseš přihlášen jako: " + userCreds.email;

let checkIfSigned = () => {
    if (sessionStorage.getItem("user-creds")) {
        document.getElementById('login-btn').classList.add('d-none');
        document.getElementById('register-btn').classList.add('d-none');
        document.getElementById('profile-btn').classList.remove('d-none');
        document.getElementById('logout-btn').classList.remove('d-none');
    }
}

let signOut = () => {
    sessionStorage.removeItem('user-creds');
    sessionStorage.removeItem('user-info');
    document.getElementById('login-btn').classList.remove('d-none');
    document.getElementById('register-btn').classList.remove('d-none');
    document.getElementById('profile-btn').classList.add('d-none');
    document.getElementById('logout-btn').classList.add('d-none');
    window.location.href = 'index.html';
}

let logOutBtn = document.getElementById('logout-btn');

window.addEventListener('load', checkIfSigned)
logOutBtn.addEventListener('click', signOut);
accountDetails.addEventListener('click', () => {
    window.location.href = 'profileDetail.html';
})