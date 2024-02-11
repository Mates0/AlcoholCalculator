document.addEventListener('DOMContentLoaded', function () {
    let genderValue;
    let genderValue2;

    let weight = localStorage.getItem('inputValue');
    let gender = localStorage.getItem("selectedGender")
    let storedTime = localStorage.getItem('selectedTime');
    let addedAlcoholObject = localStorage.getItem("timeAndVolume")
    let addedAlcohol = JSON.parse(addedAlcoholObject);
    console.log(addedAlcohol.length)
    function calculateWeightOfAlcoholFromArray() {
        let alcoholContent = 0
        let volume = 0

        for (let i = 0; i < addedAlcohol.length; i++) {
            alcoholContent += addedAlcohol[i].alcoholContent * 10
            volume += addedAlcohol[i].volume * 100
            console.log(alcoholContent)
            console.log(volume)
        }

        return ((alcoholContent * volume * 0.8) / 100) / addedAlcohol.length
    }

    let weightOfAlcohol = calculateWeightOfAlcoholFromArray()

    console.log(addedAlcohol)

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

    document.getElementById("weightOfBurnedAlcohol").innerHTML = `Hmotnost (odbouraného alkoholu): ${weightOfBurnedAlcohol} [g/h]`

    document.getElementById("promile").innerHTML = `Promile: ${maxPromile} [%.]`;

    //Časová array
    let timeNeeded = Math.ceil(weightOfAlcohol / weightOfBurnedAlcohol) + 2;

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

    let timeArray = generateTimeArray(storedTime, timeNeeded);
    //Čas vystřízlivění
    let timeToSober = timeArray[timeArray.length - 1];
    document.getElementById("timeToSober").innerHTML = `Čas vystřízlivění: ${timeToSober}`

    //Promile v časech array
    function createCalculatedArray(timeNeeded, weightOfBurnedAlcohol, weight, genderValue) {
        let resultArray = [];
        resultArray.push(0)

        for (let i = weightOfAlcohol; i > 0; i = i - weightOfBurnedAlcohol) {
            let calculatedValue = i / (weight * genderValue);
            resultArray.push(calculatedValue);
        }

        resultArray.push(0);
        return resultArray;
    }

    const promileToTimeArray = createCalculatedArray(timeNeeded, weightOfBurnedAlcohol, weight, genderValue);

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