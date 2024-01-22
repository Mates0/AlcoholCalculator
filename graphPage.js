document.addEventListener('DOMContentLoaded', function () {
    let weightOfAlcohol = (500 * 5 * 0.8) / 100
    let genderValue;
    let genderValue2;

    let weight = localStorage.getItem('inputValue');
    let gender = localStorage.getItem("selectedGender")
    let storedTime = localStorage.getItem('selectedTime');

    console.log(storedTime)

    if (gender === "Muž") {
        genderValue = 0.7
        genderValue2 = 0.1
    }
    if (gender === "Žena") {
        genderValue = 0.6
        genderValue2 = 0.085
    }

    let maxPromile = weightOfAlcohol / (weight * genderValue)
    let weightOfBurnedAlcohol = weight * genderValue2


    document.getElementById("weightOfAlcohol").innerHTML = `Hmotnost alkoholu: ${weightOfAlcohol} [g]`;

    document.getElementById("promile").innerHTML = `Promile: ${maxPromile} [%.]`;

    document.getElementById("weightOfBurnedAlcohol").innerHTML = `Hmotnost (odbouraného alkoholu): ${weightOfBurnedAlcohol} [g/h]`


    //Časová array
    let timeNeeded = Math.ceil(weightOfAlcohol / weightOfBurnedAlcohol);

    function generateTimeArray(startingHour, timeNeeded) {
        const isFullFormat = startingHour.includes(":");
        const startTime = new Date(`2024-01-22T${isFullFormat ? startingHour : startingHour + ":00"}:00`);
        const timeArray = [];

        for (let i = 0; i < timeNeeded; i++) {
            const nextTime = new Date(startTime.getTime() + i * 60 * 60 * 1000);
            const formattedTime = nextTime.toLocaleTimeString('cs', { hour: 'numeric', minute: 'numeric' });
            timeArray.push(formattedTime);
        }

        return timeArray;
    }

    const timeArray = generateTimeArray(storedTime, timeNeeded);
    console.log(timeArray);

    //Promile v časech array
    function createCalculatedArray(timeNeeded, weightOfBurnedAlcohol, weight, genderValue) {
        let resultArray = [];

        for (let i = 0; i < timeNeeded; i++) {
            let originalNumber = i * weightOfBurnedAlcohol;
            console.log(originalNumber)
            let calculatedValue = originalNumber / (weight * genderValue);
            resultArray.push(calculatedValue);
        }

        return resultArray.reverse();
    }

    const promileToTimeArray = createCalculatedArray(timeNeeded, weightOfBurnedAlcohol, weight, genderValue);
    console.log(promileToTimeArray);


    // Graf
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeArray,
            datasets: [{
                label: 'Hladina alkoholu',
                data: promileToTimeArray,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

});