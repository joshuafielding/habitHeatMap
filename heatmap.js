//monthzoom 0 is a montly view, 1 is a three month view, 2 is 6 month view, 3 is a year view.
let monthzoom = 0;

//counts the amount of days on screen
let days = 31;

//"zooms in" makes it so the user sees less days
function zoomin(){
    console.log(monthzoom);
    let container = document.querySelector(".dayContainer");

    //1 month view
    if(monthzoom == 0){
        while (days > 1) {
            container.removeChild(container.firstChild);
            console.log(days)
            days--;
        }
    }

    //3 month view
    if(monthzoom == 1){
        while (days > 61) {
            container.removeChild(container.firstChild);
            days--;
        }
    }

    //6 month view
    if(monthzoom == 2){
        while (days > 151) {
            container.removeChild(container.firstChild);
            days--;
        }
    }
}

function zoomout(){
    console.log(monthzoom);
    
    //3 month view
    if(monthzoom == 1){
        let container = document.querySelector(".dayContainer"); // Select the container with the class "dayContainer"
        for(let i = 0; i < 60; i++){
            let div = document.createElement("div");
            div.className = "day";
            container.appendChild(div); // Append each div to the container
            days++;
        }
    }
    
    //6 month view
    if(monthzoom == 2){
        let container = document.querySelector(".dayContainer"); // Select the container with the class "dayContainer"
        for(let i = 0; i < 90; i++){
            let div = document.createElement("div");
            div.className = "day";
            container.appendChild(div); // Append each div to the container
            days++;
        }
    }

    //year view
    if(monthzoom == 3){
        let container = document.querySelector(".dayContainer"); // Select the container with the class "dayContainer"
        for(let i = 0; i < 180; i++){
            let div = document.createElement("div");
            div.className = "day";
            container.appendChild(div); // Append each div to the container
            days++;
        }
    }
}



document.getElementById("in").onclick = function(){
    if(monthzoom > 0){
        monthzoom--;
        zoomin();
    }
}

document.getElementById("out").onclick = function(){
    if(monthzoom < 3){
        monthzoom++;
        zoomout();
    }
}
