export function validateLogin(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let wrongEmail = document.getElementById("wrong-email-placeholder");
    let wrongPassword = document.getElementById("wrong-password-placeholder");
    let borderBottomEmail = document.getElementById("email-input");
    let borderBottomPassword = document.getElementById("password-input");

    if (!email && !password) {
        wrongEmail.className = "d-block";
        wrongEmail.innerHTML = "Prosím zadejte email";
        borderBottomEmail.style.borderBottom = "1px solid red";
        wrongPassword.className = "d-block";
        wrongPassword.innerHTML = "Prosím zadejte heslo";
        borderBottomPassword.style.borderBottom = "1px solid red";
        return false;
    } else {
        borderBottomEmail.style.borderBottom = "1px solid #434a52";
        borderBottomPassword.style.borderBottom = "1px solid #434a52";
        wrongEmail.className = "d-none";
        wrongPassword.className = "d-none";
    }

    if (!email) {
        wrongEmail.className = "d-block";
        wrongEmail.innerHTML = "Prosím zadejte email";
        borderBottomEmail.style.borderBottom = "1px solid red";
        return false;
    } else {
        wrongEmail.className = "d-none";
        borderBottomEmail.style.borderBottom = "1px solid #434a52";
    }

    if (!emailRegex.test(email)) {
        wrongEmail.className = "d-block";
        wrongEmail.innerHTML = "Prosím zadejte platný email";
        borderBottomEmail.style.borderBottom = "1px solid red";
        return false;
    } else {
        wrongEmail.className = "d-none";
        borderBottomEmail.style.borderBottom = "1px solid #434a52";
    }

    if (!password) {
        wrongPassword.className = "d-block";
        wrongPassword.innerHTML = "Prosím zadejte heslo";
        borderBottomPassword.style.borderBottom = "1px solid red";
        return false;
    } else {
        wrongPassword.className = "d-none";
        borderBottomPassword.style.borderBottom = "1px solid #434a52";
    }

    return true;
}