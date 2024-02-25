window.addEventListener('DOMContentLoaded', (event) => {
    let userCreds = JSON.parse(sessionStorage.getItem('user-creds'));
    let email = document.getElementById("email");

    email.innerHTML = "Email: " + userCreds.email;

});
