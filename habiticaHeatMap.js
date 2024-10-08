//===================================================GLOBAL VARIABLES===================================================
//gets the date
const fullDate = new Date();
//gets the day
const currentDay = fullDate.getDate() - 1;
//gets the month from the date (0-11)
const currentMonth = fullDate.getMonth();
//gets the year from the date
const currentYear = fullDate.getFullYear();
//user selected month (0-11)
let selectedMonth = Number(currentMonth); 
//user selected year
let selectedYear = currentYear;
//initialize the format for the date
let dateFormat = document.querySelector('input[name="formatSettings"]:checked').value;
//color of borders around day boxes
let borderColor = "#000000";
//allows us to put days in dayContainer
const dayContainer = document.querySelector(".dayContainer");

//color variables used for changing background color for days... not working as expected fix later.
let futureColor = "#ffffff";
let hundredColor = "#00ff00";
let seventyFiveColor = "#b0c800";
let fiftyColor = "#d79f00";
let twentyFiveColor = "#f46900";
let zeroColor = "#ff0000";

//initialize the view to what the user previously checked (or the default value)
let view = document.querySelector('input[name="viewSettings"]:checked').value;
//if a user leaves the page with ytd selected, we have to do this calculation.
//ytd variable to check selection
let ytdSelected = false;
//this is used for ytd
let prevSelectedMonth;

if(view == "ytd"){
    ytdSelected = true;
    selectedMonth = currentMonth;
    view = currentMonth;
    dayChanger(view, "ytd");
}else{
    //show current month on screen when loading in. 
    createDays(selectedMonth, selectedYear, view);
    addDayClickListeners();
}

//================================DAY CREATION / DELETION, VIEW MANAGER, AND TASK CREATION===================================
//function to find how many days in a month
function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

// Create and append day divs inside the existing container
function createDays(monthPassed, selectedYear, numMonths) {
    // Controls how big the boxes are
    let flex;
    let fontsize = "30px";
    console.log(numMonths + " = numMonths being passed into creatDays function.");
   
    //changes what days look like depending on if the user selected it in misc settings
    if(document.getElementById("boxSizing").checked){
        if(numMonths <= 1){
            flex = "0 0 12%";
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
    }

    for(let i = 0; i < numMonths; i++) {
        let indexMonth = (monthPassed + i) % 12;
        const indexYear = selectedYear + Math.floor((monthPassed + i) / 12); // Adjust the year based on overflow

        for(let day = 0; day < daysInMonth(indexMonth, indexYear); day++) {
            const dayDiv = document.createElement("div");
            dayDiv.id = (day + 1) + "/" + (indexMonth + 1) + "/" + indexYear; // d/m/y
            dayDiv.className = 'day';
            dayDiv.style.flex = flex;
            dayDiv.style.borderColor = borderColor;
            
            //value dependent on if it's in the future or not.
            if(indexYear > currentYear ||  indexYear == currentYear && indexMonth > currentMonth || indexYear == currentYear && indexMonth == currentMonth && day > currentDay){
                dayDiv.dataset.value = "future";
                dayDiv.style.backgroundColor = futureColor;
            }
            //current day should depend on how many tasks have been completed.
            else if(indexYear == currentYear && indexMonth == currentMonth && day == currentDay){
                dayDiv.dataset.value = "future";
                dayDiv.style.backgroundColor = "#904130"; //placeholder for current day color, should be based off percentages
            }
            //else it's in the past
            else{
                dayDiv.dataset.value = "100%";
                dayDiv.style.backgroundColor = hundredColor;
            }
            console.log("day = " + day + " currentDay = " + currentDay);

            //if user wants the date on the day boxes, add text content
            if(document.getElementById("showDate").checked){
                //make text content the correct date formatting based on user selection
                if(dateFormat == "dmy"){
                    dayDiv.textContent = dayDiv.id;
                }else{
                    let formattedDateArray = dayDiv.id.split("/");
                    dayDiv.textContent = formattedDateArray[1] + "/" + formattedDateArray[0] + "/" + formattedDateArray[2];
                }
            }
            dayDiv.style.fontSize = fontsize;
            dayContainer.appendChild(dayDiv);
        }

        //create a line that splits the months up. 
        //if statement makes it so it doesnt add it at the very end and if the user wants it or not.
        if(i != numMonths-1 && document.getElementById("HR").checked){
            var monthSplitLine = document.createElement("hr"); 
            monthSplitLine.style.flex = "0 0 98%";
            monthSplitLine.style.margin = "0 auto";
            monthSplitLine.style.backgroundColor = "black";
            dayContainer.appendChild(monthSplitLine);
        }
    }
}

//change days onscreen
function dayChanger(numMonths, nextOrPrev) {
    // Calculate the new month index based on direction
    if (nextOrPrev === "next") {
        selectedMonth += Number(numMonths); //for some reason it was doing a string addition, needed to typecast.
    } else if (nextOrPrev === "prev") {
        selectedMonth -= numMonths;
    } else if(nextOrPrev === "ytd"){
        prevSelectedMonth = selectedMonth;
        selectedMonth -= numMonths;
        numMonths++;
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

    console.log(`Selected Month: ${selectedMonth + 1}, Selected Year: ${selectedYear}`); // Output for verification

    // Clear the current days and create new ones
    removeElementsByClass("dayContainer");
    //create days based off of these arguments.
    //selected month is what the starting month is, selected year is so we can tell what year we are in, 
    //and number of months is how many months we need to create
    createDays(selectedMonth, selectedYear, numMonths);
    if(nextOrPrev === "ytd"){
        selectedMonth = prevSelectedMonth;
    }
    addDayClickListeners();
}

//next arrow on the header
document.getElementById("next").onclick = function() {
    //account for if ytd is selected. if it is make the year view if we change it
    if(ytdSelected === true){
        view = 12;
    }

    dayChanger(view, "next");
}

//prev arrow on the header
document.getElementById("prev").onclick = function() {
    //account for if ytd is selected. if it is make the year view if we change it
    if(ytdSelected === true){
        view = 12;
    }

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
//allows us to append information to the daypopUp
function addDayClickListeners() {
    let days = document.getElementsByClassName("day");
    for (let i = 0; i < days.length; i++) {
        const dayPopUp = document.getElementById("dayPopUp");
        days[i].onclick = function() {
            
            //hide settings popup if someone clicks on a day.
            if(document.getElementById('settingsPopUp').style.visibility === "visible"){
                document.getElementById('settingsPopUp').style.visibility = "hidden";
            }

            //show or hide day popup depending on if it's visible and if it's the same day previously clicked or not 
            if (dayPopUp.style.visibility === 'visible' && prevID == days[i].id) {
                removeElementsByClass("dayPopUpText");
                dayPopUp.style.visibility = 'hidden';
            } 
            else {  
                dayPopUp.style.visibility = 'visible';
                removeElementsByClass("dayPopUpText"); 

                //this is what is actually on the daypopup
                const date = document.createElement("p");
                date.id = days[i].id + "date";
                date.className = "dayPopUpText";

                //format the date based off of what is currently selected.
                if (dateFormat === "dmy") {
                    date.textContent = days[i].id;
                }
                else {
                    let parts = days[i].id.split("/");
                    date.textContent = parts[1] + "/" + parts[0] + "/" + parts[2];
                }
                
                //append date to the popup.
                dayPopUp.appendChild(date); 

                //save id of currently selected day. This is used to close the day if it's clicked again.
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
    if(document.getElementById('dayPopUp').style.visibility === "visible"){
        document.getElementById('dayPopUp').style.visibility = "hidden";
    }
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

// When 'miscSettings' is clicked, show/hide the view settings dropdown
document.getElementById('miscSettings').onclick = function() {
    toggleDisplayByClass('miscSettings', 'block'); // Use 'block' as display type for this dropdown
}

//check what view is selected
document.getElementById("1month").onclick = function() {
    ytdSelected = false;
    view = 1;
    dayChanger(view, "");
}
document.getElementById("3month").onclick = function() {
    ytdSelected = false;
    view = 3;
    dayChanger(view, "");
}
document.getElementById("6month").onclick = function() {
    ytdSelected = false;
    view = 6;
    dayChanger(view, "");
}
document.getElementById("9month").onclick = function() {
    ytdSelected = false;
    view = 9;
    dayChanger(view, "");
}
document.getElementById("year").onclick = function() {
    ytdSelected = false;
    view = 12;
    dayChanger(view, "");
}
document.getElementById("ytd").onclick = function() {
    ytdSelected = true;
    selectedMonth = currentMonth;
    view = currentMonth;
    dayChanger(view, "ytd");
}

// When 'change format' is clicked, show/hide the format settings dropdown
document.getElementById('changeFormat').onclick = function() {
    toggleDisplayByClass('formatSettings', 'block'); // Use 'block' as display type for this dropdown
}

//check which format is selected
document.getElementById("dmy").onclick = function() {
    dateFormat = "dmy";
    dayChanger(view, "");
}
document.getElementById("mdy").onclick = function() {
    dateFormat = "mdy";
    dayChanger(view, "");
}

//refresh when hr is clicked.
document.getElementById("HR").onclick = function() {
    dayChanger(view, "");
}

//refresh when boxSizing is clicked.
document.getElementById("boxSizing").onclick = function() {
    dayChanger(view, "");
}

//refresh when showDate is clicked.
document.getElementById("showDate").onclick = function() {
    dayChanger(view, "");
}

//===================================================COLOR CUSTOMIZATION===================================================
document.getElementById('backgroundSubmit').addEventListener('click', function() {
    const color = document.getElementById('backgroundColor').value;
    document.body.style.backgroundColor = color;
});

//uses global variable for borderColor
document.getElementById('borderSubmit').addEventListener('click', function() {
    borderColor = document.getElementById('borderColor').value;
    dayChanger(view, "");
});

document.getElementById('futureBoxSubmit').addEventListener('click', function() {
    futureColor = document.getElementById('futureBoxColor').value;
    dayChanger(view, "");
});

document.getElementById('box100Submit').addEventListener('click', function() {
    hundredColor = document.getElementById('box100Color').value;
    dayChanger(view, "");
});

document.getElementById('box75Submit').addEventListener('click', function() {
    seventyFiveColor = document.getElementById('box75Color').value;
    dayChanger(view, "");
});

document.getElementById('box50Submit').addEventListener('click', function() {
    fiftyColor = document.getElementById('box50Color').value;
    dayChanger(view, "");
});

document.getElementById('box25Submit').addEventListener('click', function() {
    twentyFiveColor = document.getElementById('box25Color').value;
    dayChanger(view, "");
});

document.getElementById('box0Submit').addEventListener('click', function() {
    zeroColor = document.getElementById('box0Color').value;
    dayChanger(view, "");
});

//===================================================TASK CREATION===================================================

//show the task creation prompt when plus icon is clicked or close it if it's visible
document.getElementById('add').onclick = function() {
    if(document.getElementById('taskPopUp').style.visibility == 'visible'){
        document.getElementById('taskPopUp').style.visibility = 'hidden';
    }
    else{
        document.getElementById('taskPopUp').style.visibility = 'visible';
    }
    
};

//close the task creation prompt
document.getElementById('cancelTask').onclick = function() {
    document.getElementById('taskPopUp').style.visibility = 'hidden';
};

//show the task creation prompt when plus icon is clicked or close it if it's visible
document.getElementById('openRS').onclick = function() {
    toggleDisplayByClass('repeatSettings', 'inline'); // Use 'inline' as display type for this specific dropdown
};