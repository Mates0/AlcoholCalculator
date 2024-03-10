let userCreds = JSON.parse(sessionStorage.getItem('user-creds'));

let accountDetails = document.getElementById("profile-btn");
let logOutBtn = document.getElementById('logout-btn');

let checkIfSigned = () => {
    if (userCreds) {
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

window.addEventListener('load', checkIfSigned)
logOutBtn.addEventListener('click', signOut);
accountDetails.addEventListener('click', () => {
    window.location.href = 'profileDetail.html';
})