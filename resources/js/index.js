import {beers} from './alcoholLists/beers.js';
import {wines} from './alcoholLists/wines.js';
import {liquor} from './alcoholLists/liquor.js';
import {addNewAlcoholToLists} from './index_addNewAlcohol.js';
import {calculateAlcohol} from './index_calculateAlcohol.js';
// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getDatabase, get, ref, set} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6angt8_xASccfe0jBmuPjm0LM71jgoG4",
    authDomain: "alcoholcalculatorxd.firebaseapp.com",
    databaseURL: "https://alcoholcalculatorxd-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "alcoholcalculatorxd",
    storageBucket: "alcoholcalculatorxd.appspot.com",
    messagingSenderId: "701660401382",
    appId: "1:701660401382:web:736fd4dfdd08a17aecf527"
};
const app = initializeApp(firebaseConfig);

window.onload = function () {

    let userCreds = JSON.parse(sessionStorage.getItem('user-creds'));

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
    }

    if (userCreds) {
        document.getElementById("beer").addEventListener('click', function () {
            displayAlcohol(beers);
            //fetchAlcoholListsFromDatabase(beers);
        });
        document.getElementById("wines").addEventListener('click', function () {
            //fetchAlcoholListsFromDatabase(wines);
            displayAlcohol(wines);
        });
        document.getElementById("liquor").addEventListener('click', function () {
            //fetchAlcoholListsFromDatabase(liquor);
            displayAlcohol(liquor);
        });
    }
    document.getElementById("deleteAlcohol").addEventListener("click", function () {
        deleteAddedAlcohol();
    });

    document.getElementById("addAlcoholToList").addEventListener("click", function () {
        addToAlcoholList();
    });
    document.getElementById("closeModal").addEventListener("click", function () {
        console.log(addedAlcohol)
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

    function fetchAlcoholListsFromDatabase(alcoholType) {
        const db = getDatabase();
        let userCreds = JSON.parse(sessionStorage.getItem('user-creds'));
        const alcoholRef = ref(db, 'users/' + userCreds.uid + '/customAlcoholLists');

        get(alcoholRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    // Assign fetched data to your existing arrays
                    beers = data.beers || [];
                    wines = data.wines || [];
                    liquor = data.liquor || [];
                    // Display the fetched alcohol lists
                    displayAlcohol(alcoholType); // You can choose which list to display initially
                } else {
                    console.log("No alcohol lists found in the database.");
                    // Display default alcohol lists (optional)
                    // displayAlcohol(beers); // Or display default arrays
                }
            })
            .catch((error) => {
                console.error("Error fetching alcohol lists:", error);
                // Display default alcohol lists or handle the error as needed
                // displayAlcohol(beers); // Or display default arrays
            });
    }

};
