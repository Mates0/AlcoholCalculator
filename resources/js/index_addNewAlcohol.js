export function addNewAlcoholToLists(beers, wines, liquor) {
    let name = document.getElementById("alcohol-name").value;
    let alcoholContent = parseFloat(document.getElementById("percentage-of-alcohol").value);
    let type = document.getElementById("inputState").value;

    let alcohol = {
        name: name,
        alcoholcontent: alcoholContent
    };

    if (type === "Piva") {
        beers.push(alcohol);
    } else if (type === "Vína") {
        wines.push(alcohol);
    } else if (type === "Tvrdý alkohol") {
        liquor.push(alcohol);
    }

    console.log(beers, wines, liquor)

    document.getElementById("alcohol-name").value = "";
    document.getElementById("percentage-of-alcohol").value = "";
    document.getElementById("inputState").selectedIndex = 0;
}
