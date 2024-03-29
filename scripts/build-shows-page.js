// let showArray = [
//     {
//         'date': "Mon Sept 06 2021",
//         'venue': "Ronald Lane",
//         'location': "San Francisco, CA"
//     },

//     {
//         'date': "Tue Sept 21 2021",
//         'venue': "Pier 3 East",
//         'location': "San Francisco, CA"
//     },

//     {
//         'date': "Fri Oct 15 2021",
//         'venue': "View Lounge",
//         'location': "San Francisco, CA"
//     },

//     {
//         'date': "Sat Nov 06 2021",
//         'venue': "Hyatt Agency",
//         'location': "San Francisco, CA"
//     },

//     {
//         'date': "Fri Nov 26 2021",
//         'venue': "Moscow Center",
//         'location': "San Francisco, CA"
//     },

//     {
//         'date': "Wed Dec 15 2021",
//         'venue': "Press Club",
//         'location': "San Francisco, CA"
//     }
// ]

let showNodes = [];

function createShow(showObject) {

    //last to get appended to
    const showsContainer = document.querySelector(".shows-container__show-container");

    const showList = document.createElement("ul");
    showList.classList.add("shows-container__show-list");
    showsContainer.appendChild(showList);


    //date section
    let dateContainer = document.createElement("div");
    dateContainer.classList.add("shows-container__show-div");
    dateContainer.classList.add("shows-container__show-div--date");
    showList.appendChild(dateContainer);

    let dateTitle = document.createElement("p");
    dateTitle.innerText = "DATE";
    dateTitle.classList.add("shows-container__show-title");
    dateContainer.appendChild(dateTitle);

    let date = document.createElement("p");


    // Takes the date data from the server and converts it from timestamp to local date
    let showDateTimestamp = new Date (parseInt(showObject.date));

    function logDate(timestamp) {
        return timestamp.toDateString();
    }

    let showDate = logDate(showDateTimestamp);

    // ----- FINAL PUSH TO SHOW OBJECT ----
    date.innerText = showDate;

    date.classList.add("shows-container__show-info");
    date.classList.add("shows-container__show-info--bold");

    dateContainer.appendChild(date);

    //venue section
    let venueContainer = document.createElement("div");
    venueContainer.classList.add("shows-container__show-div");
    venueContainer.classList.add("shows-container__show-div--venue");
    showList.appendChild(venueContainer);

    let venueTitle = document.createElement("p");
    venueTitle.innerText = "VENUE";
    venueTitle.classList.add("shows-container__show-title");
    venueContainer.appendChild(venueTitle);

    let venue = document.createElement("p");
    venue.innerText = showObject.place;
    venue.classList.add("shows-container__show-info");
    venueContainer.appendChild(venue);

    //location section
    let locationContainer = document.createElement("div");
    locationContainer.classList.add("shows-container__show-div");
    locationContainer.classList.add("shows-container__show-div--location");
    showList.appendChild(locationContainer);

    let locationTitle = document.createElement("p");
    locationTitle.innerText = "LOCATION"
    locationTitle.classList.add("shows-container__show-title");
    locationContainer.appendChild(locationTitle);

    let location = document.createElement("p");
    location.innerText = showObject.location;
    location.classList.add("shows-container__show-info");
    locationContainer.appendChild(location);

    //Button
    let buttonForm = document.createElement("form");
    buttonForm.classList.add("shows-container__show-btn-form");


    let button = document.createElement("button");
    button.innerText = "BUY TICKETS";
    button.classList.add("shows-container__show-btn");
    buttonForm.appendChild(button);
    showList.appendChild(buttonForm);
    // showList.appendChild(button);
    


    let horizontalBreak = document.createElement("hr");
    horizontalBreak.classList.add("shows-container__show-break");
    showsContainer.appendChild(horizontalBreak);

    

    showList.addEventListener("click", (e) => {
        let current = document.querySelector('.shows-container__show-list--selected');
        if (current) {
            current.classList.remove('shows-container__show-list--selected');
        }
        let el = e.target.closest('.shows-container__show-list');
        el.classList.add('shows-container__show-list--selected');
    })

}

let showsArray = new Array;

let myArray = axios.get("https://project-1-api.herokuapp.com/showdates?api_key=dd0da2d8-71b0-47b2-b665-f84a68f5fa55");
myArray.then((resp) => {
    showsArray = resp.data;

    //populate default comments
    for (let i = 0; i < showsArray.length; i++) {
        createShow(showsArray[i]);
    }
})

console.log(myArray);

// for (let i = 0; i < showArray.length; i++) {
//     displayShow(showArray[i]);
// }
