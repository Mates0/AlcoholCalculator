window.onload = function () {
    let beers = [
        {
            "name": "Plzeň",
            "alcoholcontent": 4.2,
        },
        {
            "name": "Krušovice",
            "alcoholcontent": 3.2,
        },
        {
            "name": "Kozel 10",
            "alcoholcontent": 3.5,
        },
        {
            "name": "Braník",
            "alcoholcontent": 2.0,
        },
    ];

    let wines = [
        {
            "name": "Malbec",
            "alcoholcontent": 14.2,
        },
        {
            "name": "Tannat",
            "alcoholcontent": 13.2,
        },
        {
            "name": "Grenache",
            "alcoholcontent": 13.5,
        },
        {
            "name": "Sauvignon",
            "alcoholcontent": 12.0,
        },
    ];

    let liquor = [
        {
            "name": "Finlandia",
            "alcoholcontent": 42.2,
        },
        {
            "name": "Captain Morgan",
            "alcoholcontent": 40.2,
        },
        {
            "name": "Bacardi",
            "alcoholcontent": 38.5,
        },
        {
            "name": "Zelená",
            "alcoholcontent": 19.0,
        },
    ];

    let addedAlcohol = [];

    document.getElementById("beer").addEventListener('click', function () {
        displayAlcohol(beers);
    });
    document.getElementById("wines").addEventListener('click', function () {
        displayAlcohol(wines);
    });
    document.getElementById("liquor").addEventListener('click', function () {
        displayAlcohol(liquor);
    });
    document.getElementById("deleteAlcohol").addEventListener("click", function () {
        deleteAddedAlcohol();
    });

    document.getElementById("addAlcoholToList").addEventListener("click", function () {
        $('#exampleModal').modal('hide');
        addToAlcoholList();
    });
    document.getElementById("closeModal").addEventListener("click", function () {
        console.log(addedAlcohol)
    });

    function displayAlcohol(alcoholType) {
        clearContainer();
        let alcoholContainer = document.getElementById('alcohol-container');

        alcoholType.forEach(alcohol => {
            let cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.style.width = '18rem';
            alcoholContainer.appendChild(cardDiv);

            let cardBodyDiv = document.createElement('div');
            cardBodyDiv.classList.add('card-body');
            cardDiv.appendChild(cardBodyDiv);

            let newName = document.createElement('h5');
            newName.classList.add('card-title');
            newName.textContent = alcohol.name;
            cardBodyDiv.appendChild(newName);

            let newContent = document.createElement('p');
            newContent.classList.add('card-text');
            newContent.textContent = alcohol.alcoholcontent + '% Alkoholu';
            cardBodyDiv.appendChild(newContent);

            let addButton = document.createElement('button');
            addButton.type = 'button';
            addButton.classList.add('btn', 'btn-primary');
            addButton.textContent = 'Přidat';
            addButton.setAttribute('data-toggle', 'modal');
            addButton.setAttribute('data-target', '#exampleModal');
            addButton.addEventListener('click', function () {
                let modalTitle = document.getElementById('exampleModalLabel');
                modalTitle.textContent = alcohol.name;
                document.getElementById('time-form').value = '';
                document.getElementById('volume-form').value = '';
            });
            cardBodyDiv.appendChild(addButton);
        });
    }

    function addToAlcoholList() {
        let timeOfConsumption = document.getElementById("time-form").value;
        let volume = document.getElementById("volume-form").value;


        if (timeOfConsumption && volume) {
            let selectedAlcoholName = document.getElementById('exampleModalLabel').textContent;
            let selectedAlcohol = findAlcoholByName(selectedAlcoholName);

            let alcohol = {
                name: selectedAlcoholName,
                alcoholContent: selectedAlcohol.alcoholcontent,
                timeOfConsumption: timeOfConsumption,
                volume: volume
            };
            addedAlcohol.push(alcohol);
            renderAddedAlcohol();
            console.log(addedAlcohol)
        } else {
            alert("Prosím vyplňte všechny údaje.")
        }
    }

    function findAlcoholByName(name) {
        let allAlcohols = [...beers, ...wines, ...liquor];
        return allAlcohols.find(alcohol => alcohol.name === name);
    }


    function renderAddedAlcohol() {
        let listContainer = document.getElementById('added-alcohol-container');
        listContainer.innerHTML = '';

        addedAlcohol.forEach((alcohol, index) => {
            let listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            listItem.textContent = alcohol.name + " " + alcohol.volume + "(l)" + "- Čas Požití:" + alcohol.timeOfConsumption;

            let deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.textContent = 'Vymazat';
            deleteButton.addEventListener('click', function () {
                addedAlcohol.splice(index, 1);
                renderAddedAlcohol();
            });
            listItem.appendChild(deleteButton);

            listContainer.appendChild(listItem);
        });
    }


    function clearContainer() {
        let alcoholContainer = document.getElementById('alcohol-container');
        alcoholContainer.innerHTML = '';
    }

    function deleteAddedAlcohol() {
        addedAlcohol = [];
        renderAddedAlcohol();
    }

    function calc() {
        let weight = document.getElementById("weightForm").value
        localStorage.setItem('inputValue', weight);
        let gender = document.getElementById("genderForm").value
        localStorage.setItem("selectedGender", gender)
        let timeInput = document.getElementById("timeForm").value;
        localStorage.setItem('selectedTime', timeInput);
        localStorage.setItem('timeAndVolume', JSON.stringify(addedAlcohol));
        window.location.href = 'graphPage.html';
    }

    document.getElementById("calculate").addEventListener("click", function () {
        calc()
    })

};
