export function validateCalculation(weight, timeInput, addedAlcohol) {
    let weightForm = document.getElementById("weightForm")
    let genderForm = document.getElementById("genderForm")
    let timeForm = document.getElementById("timeForm")
    let noWeight = document.getElementById("no-weight-placeholder")
    let noGender = document.getElementById("no-gender-placeholder")
    let noTime = document.getElementById("no-time-placeholder")

    if (!weight) {
        weightForm.style.border = "3px solid red";
        noWeight.className = "d-block";
        noWeight.innerHTML = "Prosím zadejte váhu";
        return false;
    } else {
        noWeight.className = "d-none";
        weightForm.style.border = "none";
    }

    if (weight < 0) {
        weightForm.style.border = "3px solid red";
        noWeight.className = "d-block";
        noWeight.innerHTML = "Váha nemůže být záporná";
        return false;
    } else {
        noWeight.className = "d-none"
        weightForm.style.border = "none";
    }

    if (genderForm.value !== "Muž" && genderForm.value !== "Žena") {
        genderForm.style.border = "3px solid red";
        noGender.className = "d-block";
    } else {
        genderForm.style.border = "none";
        noGender.className = "d-none";
    }

    if (!timeInput) {
        timeForm.style.border = "3px solid red";
        noTime.className = "d-block";
        return false;
    } else {
        timeForm.style.border = "none";
        noTime.className = "d-none";
    }

    if (!addedAlcohol || addedAlcohol.length === 0) {
        alert("Prosím přidejte alkohol");
        return false;
    }
    return true;
}

export function validateAddingAlcoholToList(timeInput, volumeInput) {
    let addAlcoholTimeForm = document.getElementById("time-form")
    let volumeForm = document.getElementById("volume-form")
    let noVolume = document.getElementById("addalc-wrong-volume")
    let noTimeAddAlc = document.getElementById("addalc-wrong-time")

    if (!timeInput) {
        addAlcoholTimeForm.style.border = "3px solid red";
        noTimeAddAlc.className = "d-block";
        noTimeAddAlc.innerHTML = "Prosím zadejte čas přidání alkoholu"
        return false;
    } else {
        addAlcoholTimeForm.style.border = "none";
        noTimeAddAlc.className = "d-none";
    }

    if (!volumeInput) {
        volumeForm.style.border = "3px solid red";
        noVolume.className = "d-block";
        noVolume.innerHTML = "Prosím zadejte objem alkoholu";
        return false;
    } else {
        volumeForm.style.border = "none";
        noVolume.className = "d-none";
    }
    return true;
}

export function validateCustomAlcohol(nameOfAlcohol, percentageOfAlcohol) {
    let nameOfAlcoholForm = document.getElementById("alcohol-name")
    let percentageOfAlcoholForm = document.getElementById("percentage-of-alcohol")
    let noName = document.getElementById("addCustomAlc-name")
    let noPercentage = document.getElementById("addCustomAlc-percentage")
    let closeModal = document.getElementById("close-alcohol-modal")

    if (!nameOfAlcohol) {
        nameOfAlcoholForm.style.border = "3px solid red";
        noName.className = "d-block";
        noName.innerHTML = "Prosím zadejte název alkoholu";
        return false;
    } else {
        nameOfAlcoholForm.style.border = "none";
        noName.className = "d-none";
    }

    if (!percentageOfAlcohol) {
        percentageOfAlcoholForm.style.border = "3px solid red";
        noPercentage.className = "d-block";
        noPercentage.innerHTML = "Prosím zadejte obsah alkoholu";
        return false;
    } else {
        percentageOfAlcoholForm.style.border = "none";
        noPercentage.className = "d-none";
    }

    closeModal.click();
    return true;
}

