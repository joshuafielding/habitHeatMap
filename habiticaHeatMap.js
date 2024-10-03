//===================================================DAY CREATION / DELETION AND VIEW MANAGER===================================================
//gets the date
const currentDate = new Date();
//gets the month from the date (0-11)
const currentMonth = currentDate.getMonth();
//gets the year from the date
const currentYear = currentDate.getFullYear();
//user selected month (0-11)
let selectedMonth = currentMonth; 
//user selected year
let selectedYear = currentYear;
//initialize the view to 1
let view = 1;
//initialize the format for the date
let dateFormat = "mdy";


//function to find how many days in a month
function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

//allows us to put days in dayContainer
const dayContainer = document.querySelector(".dayContainer")

//show current month
createDays(selectedMonth, selectedYear, 1);
addDayClickListeners();

// Create and append day divs inside the existing container
function createDays(monthPassed, selectedYear, numMonths) {
    // Controls how big the boxes are
    let flex;
    let fontsize;
    console.log(numMonths);
    if(numMonths <= 1){
        flex = "0 0 11%";
        fontsize = "30px";
    } else if(numMonths <= 3){
        flex = "0 0 6%";
        fontsize = "20px";
    } else if(numMonths <= 6){
        flex = "0 0 4%";
        fontsize = "15px";
    } else if(numMonths <= 9){
        flex = "0 0 3%";
        fontsize = "13px";
    } else{
        flex = "0 0 2.5%";
        fontsize = "12px";
    }

    for(let i = 0; i < numMonths; i++) {
        const currentMonth = (monthPassed + i) % 12;
        const currentYear = selectedYear + Math.floor((monthPassed + i) / 12); // Adjust the year based on overflow

        for(let day = 0; day < daysInMonth(currentMonth, currentYear); day++) {
            const dayDiv = document.createElement("div");
            dayDiv.id = (day + 1) + "/" + (currentMonth + 1) + "/" + currentYear; // d/m/y
            dayDiv.className = 'day';
            dayDiv.style.flex = flex;
            
            if(dateFormat == "dmy"){
                dayDiv.textContent = dayDiv.id;
            }else{
                let test = dayDiv.id.split("/");
                dayDiv.textContent = test[1] + "/" + test[0] + "/" + test[2];
            }
            
            dayDiv.style.fontSize = fontsize;
            dayContainer.appendChild(dayDiv);
        }
    }
}

function dayChanger(numMonths, nextOrPrev) {
    // Calculate the new month index based on direction
    if (nextOrPrev === "next") {
        selectedMonth += numMonths;
    } else if (nextOrPrev === "prev") {
        selectedMonth -= numMonths;
    }

    // Adjust the year based on overflow or underflow
    while (selectedMonth >= 12) {
        selectedYear++;
        selectedMonth -= 12; // Wrap around to 0-11
    }

    while (selectedMonth < 0) {
        selectedYear--;
        selectedMonth += 12; // Wrap around to 0-11
    }

    // Log for debugging
    console.log(`Selected Month: ${selectedMonth + 1}, Selected Year: ${selectedYear}`); // Output for verification

    // Clear the current days and create new ones
    removeElementsByClass("dayContainer");
    createDays(selectedMonth, selectedYear, numMonths);
    addDayClickListeners();
}

//next arrow on the header
document.getElementById("next").onclick = function() {
    dayChanger(view, "next");
}

//prev arrow on the header
document.getElementById("prev").onclick = function() {
    dayChanger(view, "prev");
}

//function to remove tasks from dayPopUp and days from dayContainer
function removeElementsByClass(className) {
    const dayContainers = document.getElementsByClassName(className);
    for (let i = 0; i < dayContainers.length; i++) {
        while (dayContainers[i].firstChild) {
            dayContainers[i].removeChild(dayContainers[i].firstChild); // Remove each child
        }
    }
}

//tracks what the previous id was
let prevID = 0;
//allows us to append information to the day popUp
function addDayClickListeners() {
    let days = document.getElementsByClassName("day");
    for (let i = 0; i < days.length; i++) {
        const dayPopUp = document.getElementById("dayPopUp");
        days[i].onclick = function() {
            if (dayPopUp.style.visibility === 'visible' && prevID == days[i].id) {
                removeElementsByClass("dayPopUpText");
                dayPopUp.style.visibility = 'hidden';
            } 
            else {  
                dayPopUp.style.visibility = 'visible';
                removeElementsByClass("dayPopUpText"); 

                const date = document.createElement("p");
                date.id = days[i].id + "date";
                date.className = "dayPopUpText";

                if (dateFormat === "dmy") {
                    date.textContent = days[i].id;
                }
                else {
                    let parts = days[i].id.split("/");
                    date.textContent = parts[1] + "/" + parts[0] + "/" + parts[2];
                }
                
                dayPopUp.appendChild(date); 
                prevID = days[i].id;
            }
        };
    }
}

//when the x button is clicked, close popup menu
document.getElementById('closeDay').onclick = function() {
    removeElementsByClass("dayPopUpText");
    document.getElementById("dayPopUp").style.visibility = 'hidden'
}

//===================================================SETTINGS POP UP MENU===================================================

//toggle visibility of an element by ID
function toggleVisibilityById(elementId) {
    const element = document.getElementById(elementId);
    element.style.visibility = (element.style.visibility === 'visible') ? 'hidden' : 'visible';
}

//toggle display of elements by class name
function toggleDisplayByClass(className, displayType = 'block') {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(function(element) {
        element.style.display = (element.style.display === displayType) ? 'none' : displayType;
    });
}

// When the gear icon is clicked, show/hide settings popup
document.getElementById('settings').onclick = function() {
    toggleVisibilityById('settingsPopUp');
}

// When the 'x' button is clicked, hide the settings popup
document.getElementById('close').onclick = function() {
    document.getElementById('settingsPopUp').style.visibility = 'hidden';
}

// When 'change colors' is clicked, show/hide the color settings dropdown
document.getElementById('changeColors').onclick = function() {
    toggleDisplayByClass('colorSettings', 'flex'); // Use 'flex' as display type for this specific dropdown
}

// When 'change view' is clicked, show/hide the view settings dropdown
document.getElementById('changeView').onclick = function() {
    toggleDisplayByClass('viewSettings', 'block'); // Use 'block' as display type for this dropdown
}

//check what view is selected
document.getElementById("1month").onclick = function() {
    view = 1;
    dayChanger(view, "");
}
document.getElementById("3month").onclick = function() {
    view = 3;
    dayChanger(view, "");
}
document.getElementById("6month").onclick = function() {
    view = 6;
    dayChanger(view, "");
}
document.getElementById("9month").onclick = function() {
    view = 9;
    dayChanger(view, "");
}
document.getElementById("year").onclick = function() {
    view = 12;
    dayChanger(view, "");
}
document.getElementById("ytd").onclick = function() {
    view = 12 - currentMonth;
    dayChanger(view, "");
}

// When 'change format' is clicked, show/hide the format settings dropdown
document.getElementById('changeFormat').onclick = function() {
    toggleDisplayByClass('formatSettings', 'block'); // Use 'block' as display type for this dropdown
}

//check which format is selected
document.getElementById("dmy").onclick = function() {
    dateFormat = "dmy";
}
document.getElementById("mdy").onclick = function() {
    dateFormat = "mdy";
}