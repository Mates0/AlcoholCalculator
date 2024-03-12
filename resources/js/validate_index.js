export function validateIndex(weight,timeInput,addedAlcohol) {
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


//:TODO: Add validation for addAlcoholToList and add validation for adding custom alcohol
/*
let addAlcoholTimeForm = document.getElementById("time-form")
let volumeForm = document.getElementById("volume-form")
let noVolume = document.getElementById("addalc-wrong-time")
let noTimeAddAlc = document.getElementById("addalc-wrong-time")*/