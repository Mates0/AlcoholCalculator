let userCreds = JSON.parse(sessionStorage.getItem('user-creds'));
let email = document.getElementById("email");

email.innerHTML = userCreds.email;
