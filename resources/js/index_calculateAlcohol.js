export function calculateAlcohol(addedAlcohol) {
    let weight = document.getElementById("weightForm").value
    localStorage.setItem('inputValue', weight);
    let gender = document.getElementById("genderForm").value
    localStorage.setItem("selectedGender", gender)
    let timeInput = document.getElementById("timeForm").value;
    localStorage.setItem('selectedTime', timeInput);
    localStorage.setItem('timeAndVolume', JSON.stringify(addedAlcohol));
    window.location.href = 'graphPage.html';
}
