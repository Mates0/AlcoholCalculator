export function validateIndex(weight,timeInput,addedAlcohol) {
    if (!weight) {
        alert("Prosím zadejte váhu");
        return false;
    }
    if (weight < 0) {
        alert("Váha nemůže být záporná");
        return false;
    }
    if (!timeInput) {
        alert("Prosím zadejte čas");
        return false;
    }
    if (!addedAlcohol || addedAlcohol.length === 0) {
        alert("Prosím přidejte alkohol");
        return false;
    }
    return true;
}