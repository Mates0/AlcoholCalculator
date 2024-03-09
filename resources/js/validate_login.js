export function validateLogin(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let wrongEmail = document.getElementById("wrong-email-placeholder");
    let wrongPassword = document.getElementById("wrong-password-placeholder");

    if (!email && !password) {
        wrongEmail.className = "d-block";
        wrongEmail.innerHTML = "Prosím zadejte email";
        wrongPassword.className = "d-block";
        wrongPassword.innerHTML = "Prosím zadejte heslo";
        return false;
    } else {
        wrongEmail.className = "d-none";
        wrongPassword.className = "d-none";
    }

    if (!email) {
        wrongEmail.className = "d-block";
        wrongEmail.innerHTML = "Prosím zadejte email";
        return false;
    } else {
        wrongEmail.className = "d-none";
    }

    if (!emailRegex.test(email)) {
        wrongEmail.className = "d-block";
        wrongEmail.innerHTML = "Prosím zadejte platný email";
        return false;
    } else {
        wrongEmail.className = "d-none";
    }

    if (!password) {
        wrongPassword.className = "d-block";
        wrongPassword.innerHTML = "Prosím zadejte heslo";
        return false;
    } else {
        wrongPassword.className = "d-none";
    }

    return true;
}