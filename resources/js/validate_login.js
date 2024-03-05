export function validateLogin(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        alert("Prosím zadejte email");
        return false;
    }

    if (!emailRegex.test(email)) {
        alert("Špatný formát emailu");
        return false;
    }

    if (!password) {
        alert("Prosím zadejte heslo");
        return false;
    }

    return true;
}