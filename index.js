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

let addedAlcohol = [
    {
        "name": "Finlandia",
        "alcoholcontent": 42.2,
        "consumptionTime": 2300,
        "volume": 2.2
    },
    {
        "name": "Captain Morgan",
        "alcoholcontent": 42.2,
        "consumptionTime": 2300,
        "volume": 2.2
    }
]
document.getElementById("beer").addEventListener('click', function() {
    displayBeer()
});
document.getElementById("wines").addEventListener('click', function() {
    displayWine()
});
document.getElementById("liquor").addEventListener('click', function() {
    displayLiquor()
});

document.getElementById("addAlcoholToList").addEventListener("click", function () {
    console.log("niingge")
    displayAlcoholList()
})

function displayAlcoholList() {
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
            // Handle delete button click (you can remove the list item or perform other actions)
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
        addButton.setAttribute('data-toggle', 'modal');
        addButton.setAttribute('data-target', '#exampleModal');
        addButton.textContent = 'Přidat';
        addButton.addEventListener('click', function() {
            let modalTitle = document.getElementById('exampleModalLabel');
            modalTitle.textContent = beers[i].name;
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
        addButton.addEventListener('click', function() {
            let modalTitle = document.getElementById('exampleModalLabel');
            modalTitle.textContent = wines[i].name;
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
        addButton.addEventListener('click', function() {
            let modalTitle = document.getElementById('exampleModalLabel');
            modalTitle.textContent = liquor[i].name;
        });
        cardBodyDiv.appendChild(addButton);
    }
}

function clearContainer() {
    let alcoholContainer = document.getElementById('alcohol-container');
    alcoholContainer.innerHTML = '';
}
