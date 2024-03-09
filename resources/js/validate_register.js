export function validateRegister(email, password, repeatPassword) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;
    let wrongEmail = document.getElementById("wrong-email-placeholder");
    let wrongPassword = document.getElementById("wrong-password-placeholder");
    let repeatPasswordPlaceholder = document.getElementById("wrong-repeat-password-placeholder");
    let borderBottomEmail = document.getElementById("email-input");
    let borderBottomPassword = document.getElementById("password-input");
    let borderBottomRepeatPassword = document.getElementById("repeat-password-input");

    if (!emailRegex.test(email)) {
        wrongEmail.className = "d-block";
        wrongEmail.innerHTML = "Prosím zadejte platný email";
        borderBottomEmail.style.borderBottom = "1px solid red";
        return false;
    } else {
        wrongEmail.className = "d-none";
        borderBottomEmail.style.borderBottom = "1px solid #434a52";
    }

    if (password !== repeatPassword) {
        repeatPasswordPlaceholder.className = "d-block";
        repeatPasswordPlaceholder.innerHTML = "Hesla se neshodují";
        borderBottomRepeatPassword.style.borderBottom = "1px solid red";
        return false;
    } else {
        repeatPasswordPlaceholder.className = "d-none";
        borderBottomRepeatPassword.style.borderBottom = "1px solid #434a52";
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
    if (!repeatPassword) {
        repeatPasswordPlaceholder.className = "d-block";
        repeatPasswordPlaceholder.innerHTML = "Prosím zadejte heslo";
        borderBottomRepeatPassword.style.borderBottom = "1px solid red";
    } else {
        repeatPasswordPlaceholder.className = "d-none";
        borderBottomRepeatPassword.style.borderBottom = "1px solid #434a52";
    }

    if (!passwordRegex.test(password)) {
        wrongPassword.className = "d-block";
        wrongPassword.innerHTML = "Heslo musí obsahovat alespoň 6 znaků, jedno velké písmeno a jedno číslo.";
        borderBottomPassword.style.borderBottom = "1px solid red";
        return false;
    } else {
        wrongPassword.className = "d-none";
        borderBottomPassword.style.borderBottom = "1px solid #434a52";
    }
    return true;
}
