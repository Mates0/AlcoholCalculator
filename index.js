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
    ]

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
    ]

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
    ]

    let addedAlcohol = []

    let test = {
        "name": "Test",
        "alcoholcontent": 42.2,
        "consumptionTime": 2300,
        "volume": 2.2

    }
    document.getElementById("beer").addEventListener('click', function () {
        displayBeer()
    });
    document.getElementById("wines").addEventListener('click', function () {
        displayWine()
    });
    document.getElementById("liquor").addEventListener('click', function () {
        displayLiquor()
    });
    document.getElementById("deleteAlcohol").addEventListener("click", function () {
        deleteAddedAlcohol()
    })

    document.getElementById("addAlcoholToList").addEventListener("click", function () {
        addToAlcoholList()
    })

    function addToAlcoholList() {
        let listContainer = document.getElementById('added-alcohol-container');

        let ulElement = document.createElement('ul');
        ulElement.classList.add('list-group');
        listContainer.appendChild(ulElement);


        for (let i = 0; i < addedAlcohol.length; i++) {
            let listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            listContainer.appendChild(listItem);

            let textContent = document.createElement('span');
            textContent.textContent = addedAlcohol[i].consumptionTime + "-" + addedAlcohol[i].name;
            listItem.appendChild(textContent);

            let deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.textContent = 'Vymazat';

            deleteButton.addEventListener('click', function () {

            });

            listItem.appendChild(deleteButton);
            ulElement.appendChild(listItem);
        }
    }


    function displayBeer() {
        clearContainer();
        let alcoholContainer = document.getElementById('alcohol-container');

        for (let i = 0; i < beers.length; i++) {
            let cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.style.width = '18rem';
            cardDiv.id = "beer-card"
            alcoholContainer.appendChild(cardDiv);

            let cardBodyDiv = document.createElement('div');
            cardBodyDiv.classList.add('card-body');
            cardDiv.appendChild(cardBodyDiv);

            let newName = document.createElement('h5');
            newName.classList.add('card-title');
            newName.id = 'alcohol-name';
            newName.textContent = beers[i].name;
            cardBodyDiv.appendChild(newName);

            let newContent = document.createElement('p');
            newContent.classList.add('card-text');
            newContent.id = 'alcohol-content';
            newContent.textContent = beers[i].alcoholcontent + '% Alkoholu';
            cardBodyDiv.appendChild(newContent);

            let addButton = document.createElement('button');
            addButton.type = 'button';
            addButton.classList.add('btn', 'btn-primary');
            addButton.textContent = 'Přidat';
            addButton.id = "addBtn";
            addButton.setAttribute('data-toggle', 'modal');
            addButton.setAttribute('data-target', '#exampleModal');
            document.getElementById("addAlcoholToList").setAttribute("data-dismiss", "modal")
            addButton.addEventListener('click', function () {
                let modalTitle = document.getElementById('exampleModalLabel');
                modalTitle.textContent = beers[i].name;
                addedAlcohol.push(test)
                console.log(addedAlcohol)
            });

            cardBodyDiv.appendChild(addButton);
        }
    }

    function displayWine() {
        clearContainer();
        let alcoholContainer = document.getElementById('alcohol-container');

        for (let i = 0; i < wines.length; i++) {
            let cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.style.width = '18rem';
            cardDiv.id = "wine-card"
            alcoholContainer.appendChild(cardDiv);

            let cardBodyDiv = document.createElement('div');
            cardBodyDiv.classList.add('card-body');
            cardDiv.appendChild(cardBodyDiv);

            let newName = document.createElement('h5');
            newName.classList.add('card-title');
            newName.id = 'alcohol-name';
            newName.textContent = wines[i].name;
            cardBodyDiv.appendChild(newName);

            let newContent = document.createElement('p');
            newContent.classList.add('card-text');
            newContent.id = 'alcohol-content';
            newContent.textContent = wines[i].alcoholcontent + '% Alkoholu';
            cardBodyDiv.appendChild(newContent);

            let addButton = document.createElement('button');
            addButton.type = 'button';
            addButton.classList.add('btn', 'btn-primary');
            addButton.setAttribute('data-toggle', 'modal');
            addButton.setAttribute('data-target', '#exampleModal');
            addButton.textContent = 'Přidat';
            document.getElementById("addAlcoholToList").setAttribute("data-dismiss", "modal")
            addButton.addEventListener('click', function () {
                let modalTitle = document.getElementById('exampleModalLabel');
                modalTitle.textContent = wines[i].name;
                addedAlcohol.push(test)
            });
            cardBodyDiv.appendChild(addButton);
        }
    }

    function displayLiquor() {
        clearContainer();
        let alcoholContainer = document.getElementById('alcohol-container');

        for (let i = 0; i < liquor.length; i++) {
            let cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.style.width = '18rem';
            cardDiv.id = "liquor-card"
            alcoholContainer.appendChild(cardDiv);

            let cardBodyDiv = document.createElement('div');
            cardBodyDiv.classList.add('card-body');
            cardDiv.appendChild(cardBodyDiv);

            let newName = document.createElement('h5');
            newName.classList.add('card-title');
            newName.id = 'alcohol-name';
            newName.textContent = liquor[i].name;
            cardBodyDiv.appendChild(newName);

            let newContent = document.createElement('p');
            newContent.classList.add('card-text');
            newContent.id = 'alcohol-content';
            newContent.textContent = liquor[i].alcoholcontent + '% Alkoholu';
            cardBodyDiv.appendChild(newContent);

            let addButton = document.createElement('button');
            addButton.type = 'button';
            addButton.classList.add('btn', 'btn-primary');
            addButton.setAttribute('data-toggle', 'modal');
            addButton.setAttribute('data-target', '#exampleModal');
            addButton.textContent = 'Přidat';
            document.getElementById("addAlcoholToList").setAttribute("data-dismiss", "modal")
            addButton.addEventListener('click', function () {
                let modalTitle = document.getElementById('exampleModalLabel');
                modalTitle.textContent = liquor[i].name;
                addedAlcohol.push(test)
            });
            cardBodyDiv.appendChild(addButton);
        }
    }

    function clearContainer() {
        let alcoholContainer = document.getElementById('alcohol-container');
        alcoholContainer.innerHTML = '';
    }

    function deleteAddedAlcohol() {
        let listContainer = document.getElementById('added-alcohol-container');
        while (listContainer.firstChild) {
            listContainer.removeChild(listContainer.firstChild);
        }
        addedAlcohol = []
    }

    function calc() {
        let weight = document.getElementById("weightForm").value
        localStorage.setItem('inputValue', weight);
        let gender = document.getElementById("genderForm").value
        localStorage.setItem("selectedGender", gender)
        let timeInput = document.getElementById("timeForm").value;
        localStorage.setItem('selectedTime', timeInput);
        window.location.href = 'graphPage.html';
    }

    document.getElementById("calculate").addEventListener("click", function () {
        calc()
    })

    console.log(addedAlcohol)
}