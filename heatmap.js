//gets the date
const currentDate = new Date()
//gets the month from the date
const currentMonth = currentDate.getMonth()
//array for months
const  months = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"]; //thanks toast :3
//allows us to create days
let container = document.querySelector(".dayContainer");
//tracks how many days are on the screen
let days = 0;
//tracks how many days were taken away
let minusDays = 0;
//tracks how many days to add
let addDays = 0;
//user selected month
let selectedMonth;
//user selected view
let currentView;

//loads the current month 
window.onload = function(){
    for(let i = 0; i < months[currentMonth]; i++){
        let div = document.createElement("div");
        div.className = "day";
        container.appendChild(div);
        days++;
    }
    selectedMonth = currentMonth;
    currentView = 0;
}

//function for closing / opening settings
let open = true;
document.getElementById("headerSettings").onclick = function(){
    if(open === true){   
        document.getElementById("header").style.display = "none";
        document.getElementById("headerSettings").style.backgroundColor = "#1e1e1e"
        document.getElementById("headerSettings").style.color = "#363636"
        open = false;
    }
    else{
        document.getElementById("header").style.display = "flex";
        document.getElementById("headerSettings").style.backgroundColor = "rgba(103, 250, 186, 0.593)"
        document.getElementById("headerSettings").style.color = "whitesmoke"
        open = true;
    }
}

//function for creating the days
function createDays(numDays){
    let div = document.createElement("div");
    div.className = "day";
    if(numDays >= 365){
        div.style.height = "0.8em";
        div.style.width = "0.8em";
    }
    else if(numDays >= 265){
        div.style.height = "0.9em";
        div.style.width = "0.9em";
    }
    else if(numDays >= 175){
        div.style.height = "1em";
        div.style.width = "1em";
    }
    else if(numDays >= 85){
        div.style.height = "1.7em";
        div.style.width = "1.7em";
    }
    else{
        div.style.height = "5.2em";
        div.style.width = "5.2em";
    }
    container.appendChild(div);
}

//calculating how many days the selected months adds up to
function findmonthAdd(curView){
    let monthAdd = 0;
    //1 month
    if (curView == 0) {
        monthAdd = Number(months[selectedMonth]);
    }
    
    //3 month
    if (curView == 1) {
        if (selectedMonth == 0) {
            monthAdd = Number(months[selectedMonth]) + Number(months[10]) + Number(months[11]);
        } 
        else if (selectedMonth == 1) {
            monthAdd = Number(months[selectedMonth]) + Number(months[0]) + Number(months[11]);
        }
        else {
            monthAdd = Number(months[selectedMonth]) + Number(months[selectedMonth - 1]) + Number(months[selectedMonth - 2]);
        }
    }

    //6 month
    if (curView == 2) {
        let monthsLeft = 6;
        for(let i = selectedMonth; (i >= 0 && monthsLeft != 0); i--){
            monthAdd += Number(months[i]);
            monthsLeft--;
            console.log("Month being added = " + i);
        }
        for(let i = 0; i < monthsLeft; i++){
            monthAdd += Number(months[11-i]);
            console.log("Month being added = " + (11-i));
        }
    }

    //9 month
    if (curView == 3) {
        let monthsLeft = 9;
        for(let i = selectedMonth; (i >= 0 && monthsLeft != 0); i--){
            monthAdd += Number(months[i]);
            monthsLeft--;
            console.log("Month being added = " + i);
        }
        for(let i = 0; i < monthsLeft; i++){
            monthAdd += Number(months[11-i]);
            console.log("Month being added = " + (11-i));
        }
    }

    //year
    if (curView == 4) {
        let monthsLeft = 12;
        for(let i = selectedMonth; (i >= 0 && monthsLeft != 0); i--){
            monthAdd += Number(months[i]);
            monthsLeft--;
            console.log("Month being added = " + i);
        }
        for(let i = 0; i < monthsLeft; i++){
            monthAdd += Number(months[11-i]);
            console.log("Month being added = " + (11-i));
        }
    }

    //YTD
    if(curView == 5){
        for (let i = 0; i <= selectedMonth; i++){
            monthAdd += Number(months[i]);
            console.log("Month being added = " + i);
        }
    }

    console.log("Days to be added: " + monthAdd);
    return monthAdd
}

//January selected
document.getElementById("jan").onclick = function(){
    //change month
    selectedMonth = 0;    
    //remove days on screen
    for(let i = 0; i<days; i++){
        container.removeChild(container.lastChild);
        minusDays++;
    }
    days -= minusDays;
    minusDays = 0;

    //finds how many days should be added back
    let daysNeeded = findmonthAdd(currentView);
    //add the correct amount of days back
    for(let i=0; i<daysNeeded; i++){
        createDays(daysNeeded);
        addDays++;
    }
    days += addDays;
    addDays = 0;
}

//February selected
document.getElementById("feb").onclick = function(){
    //change month
    selectedMonth = 1;    
    //remove days on screen
    for(let i = 0; i<days; i++){
        container.removeChild(container.lastChild);
        minusDays++;
    }
    days -= minusDays;
    minusDays = 0;

    //finds how many days should be added back
    let daysNeeded = findmonthAdd(currentView);
    //add the correct amount of days back
    for(let i=0; i<daysNeeded; i++){
        createDays(daysNeeded);
        addDays++;
    }
    days += addDays;
    addDays = 0;
}

//March selected
document.getElementById("march").onclick = function(){
    //change month
    selectedMonth = 2;    
    //remove days on screen
    for(let i = 0; i<days; i++){
        container.removeChild(container.lastChild);
        minusDays++;
    }
    days -= minusDays;
    minusDays = 0;

    //finds how many days should be added back
    let daysNeeded = findmonthAdd(currentView);
    //add the correct amount of days back
    for(let i=0; i<daysNeeded; i++){
        createDays(daysNeeded);
        addDays++;
    }
    days += addDays;
    addDays = 0;
}

//April selected
document.getElementById("apr").onclick = function(){
    //change month
    selectedMonth = 3;    
    //remove days on screen
    for(let i = 0; i<days; i++){
        container.removeChild(container.lastChild);
        minusDays++;
    }
    days -= minusDays;
    minusDays = 0;

    //finds how many days should be added back
    let daysNeeded = findmonthAdd(currentView);
    //add the correct amount of days back
    for(let i=0; i<daysNeeded; i++){
        createDays(daysNeeded);
        addDays++;
    }
    days += addDays;
    addDays = 0;
}

//May selected
document.getElementById("may").onclick = function(){
    //change month
    selectedMonth = 4;    
    //remove days on screen
    for(let i = 0; i<days; i++){
        container.removeChild(container.lastChild);
        minusDays++;
    }
    days -= minusDays;
    minusDays = 0;

    //finds how many days should be added back
    let daysNeeded = findmonthAdd(currentView);
    //add the correct amount of days back
    for(let i=0; i<daysNeeded; i++){
        createDays(daysNeeded);
        addDays++;
    }
    days += addDays;
    addDays = 0;
}

//June selected
document.getElementById("jun").onclick = function(){
    //change month
    selectedMonth = 5;    
    //remove days on screen
    for(let i = 0; i<days; i++){
        container.removeChild(container.lastChild);
        minusDays++;
    }
    days -= minusDays;
    minusDays = 0;

    //finds how many days should be added back
    let daysNeeded = findmonthAdd(currentView);
    //add the correct amount of days back
    for(let i=0; i<daysNeeded; i++){
        createDays(daysNeeded);
        addDays++;
    }
    days += addDays;
    addDays = 0;
}

//July selected
document.getElementById("jul").onclick = function(){
    //change month
    selectedMonth = 6;    
    //remove days on screen
    for(let i = 0; i<days; i++){
        container.removeChild(container.lastChild);
        minusDays++;
    }
    days -= minusDays;
    minusDays = 0;

    //finds how many days should be added back
    let daysNeeded = findmonthAdd(currentView);
    //add the correct amount of days back
    for(let i=0; i<daysNeeded; i++){
        createDays(daysNeeded);
        addDays++;
    }
    days += addDays;
    addDays = 0;
}

//August selected
document.getElementById("aug").onclick = function(){
    //change month
    selectedMonth = 7;    
    //remove days on screen
    for(let i = 0; i<days; i++){
        container.removeChild(container.lastChild);
        minusDays++;
    }
    days -= minusDays;
    minusDays = 0;

    //finds how many days should be added back
    let daysNeeded = findmonthAdd(currentView);
    //add the correct amount of days back
    for(let i=0; i<daysNeeded; i++){
        createDays(daysNeeded);
        addDays++;
    }
    days += addDays;
    addDays = 0;
}

//September selected
document.getElementById("sep").onclick = function(){
    //change month
    selectedMonth = 8;    
    //remove days on screen
    for(let i = 0; i<days; i++){
        container.removeChild(container.lastChild);
        minusDays++;
    }
    days -= minusDays;
    minusDays = 0;

    //finds how many days should be added back
    let daysNeeded = findmonthAdd(currentView);
    //add the correct amount of days back
    for(let i=0; i<daysNeeded; i++){
        createDays(daysNeeded);
        addDays++;
    }
    days += addDays;
    addDays = 0;
}

//October selected
document.getElementById("oct").onclick = function(){
    //change month
    selectedMonth = 9;    
    //remove days on screen
    for(let i = 0; i<days; i++){
        container.removeChild(container.lastChild);
        minusDays++;
    }
    days -= minusDays;
    minusDays = 0;

    //finds how many days should be added back
    let daysNeeded = findmonthAdd(currentView);
    //add the correct amount of days back
    for(let i=0; i<daysNeeded; i++){
        createDays(daysNeeded);
        addDays++;
    }
    days += addDays;
    addDays = 0;
}

//November selected
document.getElementById("nov").onclick = function(){
    //change month
    selectedMonth = 10;    
    //remove days on screen
    for(let i = 0; i<days; i++){
        container.removeChild(container.lastChild);
        minusDays++;
    }
    days -= minusDays;
    minusDays = 0;

    //finds how many days should be added back
    let daysNeeded = findmonthAdd(currentView);
    //add the correct amount of days back
    for(let i=0; i<daysNeeded; i++){
        createDays(daysNeeded);
        addDays++;
    }
    days += addDays;
    addDays = 0;
}


//December selected
document.getElementById("dec").onclick = function(){
    //change month
    selectedMonth = 11;    
    //remove days on screen
    for(let i = 0; i<days; i++){
        container.removeChild(container.lastChild);
        minusDays++;
    }
    days -= minusDays;
    minusDays = 0;

    //finds how many days should be added back
    let daysNeeded = findmonthAdd(currentView);
    //add the correct amount of days back
    for(let i=0; i<daysNeeded; i++){
        createDays(daysNeeded);
        addDays++;
    }
    days += addDays;
    addDays = 0;
}

//changing to 1 month view
document.getElementById("1month").onclick = function(){
    //change current view
    currentView = 0
    console.log("current view:" + currentView);

    //remove all the days on screen
    for(let i = 0; i<days; i++){
        container.removeChild(container.lastChild);
        minusDays++;
    }
    days -= minusDays;
    minusDays = 0;

    //add the correct amount of days back
    for(let i=0; i<months[selectedMonth]; i++){
        let div = document.createElement("div");
        div.className = "day";
        container.appendChild(div);
        addDays++;
    }
    days += addDays;
    addDays = 0;
}

//changing to 3 month view
document.getElementById("3month").onclick = function(){
    //change currentView
    currentView = 1
    
    //remove all the days on screen
    for(let i = 0; i<days; i++){
        container.removeChild(container.lastChild);
        minusDays++;
    }
    days -= minusDays;
    minusDays = 0;

    //finds how many days should be added back
    let daysNeeded = findmonthAdd(currentView);
    //add the correct amount of days back
    for(let i=0; i<daysNeeded; i++){
        createDays(daysNeeded);
        addDays++;
    }
    days += addDays;
    addDays = 0;
}

//changing to 6 month view
document.getElementById("6month").onclick = function(){
    //change currentView
    currentView = 2
    
    //remove all the days on screen
    for(let i = 0; i<days; i++){
        container.removeChild(container.lastChild);
        minusDays++;
    }
    days -= minusDays;
    minusDays = 0;

    //finds how many days should be added back
    let daysNeeded = findmonthAdd(currentView);
    //add the correct amount of days back
    for(let i=0; i<daysNeeded; i++){
        createDays(daysNeeded);
        addDays++;
    }
    days += addDays;
    addDays = 0;
}

//changing to 9 month view
document.getElementById("9month").onclick = function(){
    //change currentView
    currentView = 3
    
    //remove all the days on screen
    for(let i = 0; i<days; i++){
        container.removeChild(container.lastChild);
        minusDays++;
    }
    days -= minusDays;
    minusDays = 0;

    //finds how many days should be added back
    let daysNeeded = findmonthAdd(currentView);
    //add the correct amount of days back
    for(let i=0; i<daysNeeded; i++){
        createDays(daysNeeded);
        addDays++;
    }
    days += addDays;
    addDays = 0;
}

//changing to 1 year view
document.getElementById("year").onclick = function(){
    //change currentView
    currentView = 4
    
    //remove all the days on screen
    for(let i = 0; i<days; i++){
        container.removeChild(container.lastChild);
        minusDays++;
    }
    days -= minusDays;
    minusDays = 0;

    //finds how many days should be added back
    let daysNeeded = findmonthAdd(currentView);
    //add the correct amount of days back
    for(let i=0; i<daysNeeded; i++){
        createDays(daysNeeded);
        addDays++;
    }
    days += addDays;
    addDays = 0;
}

//changing to YTD
document.getElementById("ytd").onclick = function(){
    //change currentView
    currentView = 5
    
    //remove all the days on screen
    for(let i = 0; i<days; i++){
        container.removeChild(container.lastChild);
        minusDays++;
    }
    days -= minusDays;
    minusDays = 0;

    //finds how many days should be added back
    let daysNeeded = findmonthAdd(currentView);
    //add the correct amount of days back
    for(let i=0; i<daysNeeded; i++){
        createDays(daysNeeded);
        addDays++;
    }
    days += addDays;
    addDays = 0;
}