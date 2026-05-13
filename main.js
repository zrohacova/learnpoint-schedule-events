// CALENDAR 
const currentDate = new Date();
const first = currentDate.getDate() - currentDate.getDay() + 1;

const monday = new Date(currentDate.setDate(first))
const sunday = new Date(currentDate.setDate(first + 6))

const dateHeaders = document.getElementsByClassName("calendar-header-week-date")[0];
dateHeaders.innerText = `${monday.toLocaleDateString()} - ${sunday.toLocaleDateString()}`;


const prevButton = document.getElementById("previousButton");
prevButton.addEventListener('click', (e) => {
    const currentWeek = new Date(document.getElementsByClassName("calendar-day-view")[0].id);
    currentWeek.setDate(currentWeek.getDate() - 7);
    renderCalendar(currentWeek);

});

const nextButton = document.getElementById("nextButton");
nextButton.addEventListener('click', (e) => {
    const currentWeek = new Date(document.getElementsByClassName("calendar-day-view")[0].id);
    currentWeek.setDate(currentWeek.getDate() + 7);
    renderCalendar(currentWeek);

});


const daysHeader = document.getElementsByClassName("calendar-days-header")[0];
const daysColumn = document.getElementsByClassName("calendar-day-view");

const options = { weekday: "short" };

for (let i = 0; i < 7; i++) {
    const day = new Date(currentDate.setDate(first + i))
    const weekColumn = document.createElement("div");
    weekColumn.classList.add("calendar-day-column");
    // weekColumn.id = `${new Date(day).toLocaleDateString()}`;
    weekColumn.innerText = `${new Intl.DateTimeFormat("sv-SE", options).format(day)}, ${day.getDate()}`;
    daysHeader.appendChild(weekColumn);

    daysColumn[i].id = `${new Date(day).toLocaleDateString()}`;
}

function renderCalendar(firstDayDate) {
    // changing week
    let lastDayDate = new Date(firstDayDate)
    lastDayDate.setDate(lastDayDate.getDate() + 6)

    const dateHeaders = document.getElementsByClassName("calendar-header-week-date")[0];
    dateHeaders.innerText = `${firstDayDate.toLocaleDateString()} - ${lastDayDate.toLocaleDateString()}`;


    // changing columns
    const daysHeader = document.getElementsByClassName("calendar-day-column");
    const daysColumn = document.getElementsByClassName("calendar-day-view");

    for (let i = 0; i < 7; i++) {
        const day = new Date(firstDayDate);
        day.setDate(day.getDate() + i);

        //daysHeader[i].id = `${day.toLocaleDateString()}`;
        daysColumn[i].id = `${day.toLocaleDateString()}`;
        daysHeader[i].innerText = `${new Intl.DateTimeFormat("sv-SE", options).format(day)}, ${day.getDate()}`;
    }


}



// EVENTS
const eventsData = [
    // { value: "Activity", starttime: "10:00", end: "11:00", duration: 60, day: "Mon" },
    // { value: "Lab", starttime: "12:30", end: "14:00", duration: 90, day: "Tue" },
    // { value: "Lab", starttime: "12:50", end: "13:30", duration: 40, day: "Tue" },
    { value: "A", starttime: new Date(2026, 4, 11, 9, 0), end: new Date(2026, 4, 11, 10, 0), duration: 60, day: "Thu" },
    { value: "B", starttime: new Date(2026, 4, 11, 9, 30), end: new Date(2026, 4, 11, 10, 30), duration: 60, day: "Thu" },
    { value: "C", starttime: new Date(2026, 4, 11, 9, 45), end: new Date(2026, 4, 11, 12, 0), duration: 120, day: "Thu" },
    { value: "D", starttime: new Date(2026, 4, 11, 11, 0), end: new Date(2026, 4, 11, 11, 30), duration: 30, day: "Thu" },
    { value: "E", starttime: new Date(2026, 4, 11, 11, 30), end: new Date(2026, 4, 11, 12, 0), duration: 30, day: "Thu" },
]


const events = [];
const slotEndDates = [];
let lastEndDate = null;
let slot = 0;


for (let i = 0; i < eventsData.length; i++) {
    const event = eventsData[i];

    let j = 0;

    let startSlot = 0;
    let overlap = 0;

    while (j < slotEndDates.length) {
        if (event.starttime >= slotEndDates[j] && overlap === 0) {
            slotEndDates[j] = event.end;
            startSlot = j;
            overlap++;
            j++;
            continue;
            // break;
        }

        if (overlap > 0 && event.starttime < slotEndDates[j]) {
            overlap++;
        }
        j++;
    }

    if (j >= slotEndDates.length && overlap === 0) {

        if (overlap === 0) {
            overlap++;
            startSlot = j;
        }

        slotEndDates.push(event.end);
    }

    // console.log(event.value, startSlot, overlap);
    // console.log(event.starttime.toLocaleTimeString())
    // console.log(event.end.toLocaleTimeString())
    // console.log("-----")

    events.push({ ...event, startSlot, overlap });
}



for (const event of events) {
    const eventDate = event.starttime.toLocaleDateString();
    const dayDiv = document.getElementById(eventDate);

    const eventDiv = document.createElement("div");

    const startHour = event.starttime.getHours();
    const startMinute = event.starttime.getMinutes();

    const duration = Math.round((event.end.getTime() - event.starttime.getTime()) / 60000);

    eventDiv.innerText = event.value;
    //eventDiv.style.width = `${100 / slotEndDates.length * event.overlap}%`;
    //eventDiv.style.height = 60 * duration / 60 + "px"; // duration in minutes
    eventDiv.style.backgroundColor = "hsl(" + Math.random() * 360 + ", 100%, 75%)";

    eventDiv.style.position = "absolute";

    const top = (((startHour - 7) * 60 + startMinute) / 600) * 100 + "%";
    const bottom = 100 - (((event.end.getHours() - 7) * 60 + event.end.getMinutes()) / 600) * 100 + "%";
    const left = 1 / slotEndDates.length * event.startSlot * 100 + "%";
    const right = (slotEndDates.length - (event.startSlot + event.overlap)) / slotEndDates.length * 100 + "%";
    eventDiv.style.inset = `${top} ${right} ${bottom} ${left}`;



    
    //eventDiv.style.top = 20 + (startHour - 7) + (startHour - 7) * 60 + (startMinute * 60 / 60) + "px"; // header size + something with borders? + moved hour AND PLUS minutes offset
    //eventDiv.style.left = 60 * event.startSlot + "px";
    dayDiv.appendChild(eventDiv);

}

