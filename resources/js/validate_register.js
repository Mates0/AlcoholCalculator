export function validateRegister(email, password, repeatPassword) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;

    if (!emailRegex.test(email)) {
        alert("Špatný formát emailu");
        return false;
    }

    if (password !== repeatPassword) {
        alert("Hesla se neshodují");
        return false;
    }

    if (!password || !repeatPassword) {
        alert("Prosím zadejte heslo");
        return false;
    }

    if (!passwordRegex.test(password)) {
        alert("Heslo musí obsahovat alespoň 6 znaků, jedno velké písmeno a jedno číslo.");
        return false;
    }
    return true;
}
