import {beers} from './alcoholLists/beers.js';
import {wines} from './alcoholLists/wines.js';
import {liquor} from './alcoholLists/liquor.js';
import firebaseConfig from "./firebaseConfig/firebaseConfig.js";
import {addNewAlcoholToLists} from './index_addNewAlcohol.js';
import {calculateAlcohol} from './index_calculateAlcohol.js';
import {validateAddingAlcoholToList, validateCalculation} from "./validate_index.js";
import {removeAlcoholFromDatabase} from "./index_removeFromDatabase.js";
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getDatabase, get, ref, set, remove} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const alcoholData = {
    beers: [],
    wines: [],
    liquor: []
};

let noAlcoholInDB = false
let clickedOn

const app = initializeApp(firebaseConfig);

window.onload = function () {

    let userCreds = JSON.parse(sessionStorage.getItem('user-creds'));

    let scareLabel = document.getElementById('scare-label');

    let addedAlcohol = [];

    if (!userCreds) {
        document.getElementById("beer").addEventListener('click', function () {
            displayAlcohol(beers);
        });
        document.getElementById("wines").addEventListener('click', function () {
            displayAlcohol(wines);
        });
        document.getElementById("liquor").addEventListener('click', function () {
            displayAlcohol(liquor);
        });
        scareLabel.classList.add('d-block');
    }

    if (userCreds) {
        document.getElementById("beer").addEventListener('click', function () {
            fetchAlcoholListsFromDatabase(alcoholData.beers);
            clickedOn = "beers"
        });
        document.getElementById("wines").addEventListener('click', function () {
            fetchAlcoholListsFromDatabase(alcoholData.wines);
            clickedOn = "wines"
        });
        document.getElementById("liquor").addEventListener('click', function () {
            fetchAlcoholListsFromDatabase(alcoholData.liquor);
            clickedOn = "liquor"
        });
        scareLabel.classList.add('d-none');
    }
    document.getElementById("deleteAlcohol").addEventListener("click", function () {
        deleteAddedAlcohol();
    });

    document.getElementById("addAlcoholToList").addEventListener("click", function () {
        addToAlcoholList();
    });
    document.getElementById("add-more-alcohol").addEventListener("click", function () {
        var modal = new bootstrap.Modal(document.getElementById('add-more-alcohol-modal'));

        modal.show();
    });

    document.getElementById("add-To-List").addEventListener("click", function (event) {
        addNewAlcoholToLists(beers, wines, liquor);
    });
    document.getElementById("calculate").addEventListener("click", function () {
        calculateAlcohol(addedAlcohol)
    })
    document.getElementById("login-btn").addEventListener("click", function () {
        login()
    });

    document.getElementById("register-btn").addEventListener("click", function () {
        register()
    });

    function login() {
        window.location.href = 'login.html';
    }

    function register() {
        window.location.href = 'register.html';
    }

    function displayAlcohol(alcoholType) {
        if (alcoholType.length === 0) {
            if (clickedOn === "beers") {
                fetchAlcoholListsFromDatabase(alcoholData.beers);
            }
            if (clickedOn === "wines") {
                fetchAlcoholListsFromDatabase(alcoholData.wines);
            }
            if (clickedOn === "liquor") {
                fetchAlcoholListsFromDatabase(alcoholData.liquor);
            }
        }
        clearContainer();
        let alcoholContainer = document.getElementById('alcohol-container');

        alcoholType.forEach(alcohol => {
            let cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.classList.add("bg-dark")
            cardDiv.classList.add("text-white")
            cardDiv.style.border = "1px solid white"
            cardDiv.style.width = '12rem';
            cardDiv.style.margin = '2px';
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
            addButton.classList.add('btn', 'btn-success', "btn-rounded");
            addButton.textContent = '+';
            addButton.setAttribute('data-toggle', 'modal');
            addButton.setAttribute('data-target', '#exampleModal');
            addButton.addEventListener('click', function () {
                let modalTitle = document.getElementById('exampleModalLabel');
                modalTitle.textContent = alcohol.name;
                document.getElementById('time-form').value = '';
                document.getElementById('volume-form').value = '';
            });
            cardBodyDiv.appendChild(addButton);

            let deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.classList.add('btn', 'btn-danger', "btn-rounded");
            deleteButton.textContent = '-';
            deleteButton.style.marginLeft = "15px"
            deleteButton.addEventListener('click', function () {
                alcoholType.splice(alcoholType.indexOf(alcohol), 1);
                displayAlcohol(alcoholType);
                if (userCreds) {
                    removeAlcoholFromDatabase()
                }
            });
            cardBodyDiv.appendChild(deleteButton);
        });
    }

    function addToAlcoholList() {
        let timeOfConsumption = document.getElementById("time-form").value;
        let volume = document.getElementById("volume-form").value;
        let addButton = document.getElementById("add-To-List")

        if (!validateAddingAlcoholToList(timeOfConsumption, volume)) {
            return;
        }

        $('#exampleModal').modal('hide')

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
    }

    function findAlcoholByName(name) {
        if (noAlcoholInDB && userCreds) {
            noAlcoholInDB = false
            let allAlcohols = [...beers, ...wines, ...liquor];
            return allAlcohols.find(alcohol => alcohol.name === name);
        }
        if (userCreds) {
            let allAlcohols = [...alcoholData.beers, ...alcoholData.wines, ...alcoholData.liquor];
            return allAlcohols.find(alcohol => alcohol.name === name);
        }
        if (!userCreds) {
            let allAlcohols = [...beers, ...wines, ...liquor];
            return allAlcohols.find(alcohol => alcohol.name === name);
        }
    }


    function renderAddedAlcohol() {
        let listContainer = document.getElementById('added-alcohol-container');
        listContainer.innerHTML = '';

        addedAlcohol.forEach((alcohol, index) => {
            let listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', "text-white");
            listItem.style.borderBottom = "1px solid white"
            listItem.style.fontSize = "20px"
            listItem.style.fontFamily = "Verdana"
            listItem.textContent = alcohol.timeOfConsumption + " " + alcohol.name + " " + alcohol.volume + " l";

            let deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.textContent = '-';
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

    function fetchAlcoholListsFromDatabase(alcoholType) {
        const db = getDatabase();
        let userCreds = JSON.parse(sessionStorage.getItem('user-creds'));
        const alcoholRef = ref(db, 'users/' + userCreds.uid + '/customAlcoholLists');

        get(alcoholRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    alcoholData.beers = data.beers;
                    alcoholData.wines = data.wines;
                    alcoholData.liquor = data.liquor;
                    displayAlcohol(alcoholType);
                } else {
                    let alcType
                    if (alcoholType === alcoholData.beers) {
                        alcType = beers
                    }
                    if (alcoholType === alcoholData.wines) {
                        alcType = wines
                    }
                    if (alcoholType === alcoholData.liquor) {
                        alcType = liquor
                    }
                    noAlcoholInDB = true
                    displayAlcohol(alcType);
                    console.log("No alcohol lists found in the database.");
                }
            })
            .catch((error) => {
                console.error("Error fetching alcohol lists:", error);
            });
    }

};
