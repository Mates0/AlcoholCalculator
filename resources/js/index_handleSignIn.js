let loginBtn = document.getElementById('login-btn');
let registerBtn = document.getElementById('register-btn');
let profileBtn = document.getElementById('profile-btn');
let logoutBtn = document.getElementById('logout-btn');

function checkIfSigned() {
    let userCreds = JSON.parse(sessionStorage.getItem('user-creds'));
    if (userCreds) {
        loginBtn.classList.add('d-none');
        registerBtn.classList.add('d-none');
        profileBtn.classList.remove('d-none');
        logoutBtn.classList.remove('d-none');
    }
}

export function signOut() {
    sessionStorage.removeItem('user-creds');
    sessionStorage.removeItem('user-info');
    loginBtn.classList.remove('d-none');
    registerBtn.classList.remove('d-none');
    profileBtn.classList.add('d-none');
    logoutBtn.classList.add('d-none');
    window.location.href = 'index.html';
}

function redirectToProfile() {
    window.location.href = 'profileDetail.html';
}

window.addEventListener('load', checkIfSigned);
logoutBtn.addEventListener('click', signOut);
profileBtn.addEventListener('click', redirectToProfile);
