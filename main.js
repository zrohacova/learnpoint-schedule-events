const eventsData = [
    // { value: "Activity", starttime: "10:00", end: "11:00", duration: 60, day: "Mon" },
    // { value: "Lab", starttime: "12:30", end: "14:00", duration: 90, day: "Tue" },
    // { value: "Lab", starttime: "12:50", end: "13:30", duration: 40, day: "Tue" },
    { value: "A", starttime: new Date("2026-05-11T09:00:00"), end: new Date("2026-05-11T10:00:00"), duration: 60, day: "Thu" },
    { value: "B", starttime: new Date("2026-05-11T09:30:00"), end: new Date("2026-05-11T10:30:00"), duration: 60, day: "Thu" },
    { value: "C", starttime: new Date("2026-05-11T09:45:00"), end: new Date("2026-05-11T12:00:00"), duration: 120, day: "Thu" },
    { value: "D", starttime: new Date("2026-05-11T11:00:00"), end: new Date("2026-05-11T11:30:00"), duration: 30, day: "Thu" },
    { value: "E", starttime: new Date("2026-05-11T11:30:00"), end: new Date("2026-05-11T12:00:00"), duration: 30, day: "Thu" },
]


const events = [];
const slotEndDates = [];
let lastEndDate = null;
let slot = 0;


for (let i = 0; i < eventsData.length; i++) {
    const event = eventsData[i];

    let j = 0;

    let startSlot = 0;

    while (j < slotEndDates.length) {
        if (event.starttime >= slotEndDates[j]) {
            slotEndDates[j] = event.end;
            break;
        }
        j++;
    }

    if (j >= slotEndDates.length) {
        slotEndDates.push(event.end);
    }

    console.log(event.value, j);
    console.log(event.starttime.toLocaleTimeString())
    console.log(event.end.toLocaleTimeString())
    console.log("-----")

    events.push({ ...event, j });
}

for (const event of events) {
    console.log(event)
}

for (const event of events) {
    const dayDiv = document.getElementById(event.day); // this shouold be replaced by proper date later, but for now..

    const eventDiv = document.createElement("div");

    const startHour = event.starttime.getHours();
    const startMinute = event.starttime.getMinutes();

    const duration = Math.round((event.end.getTime() - event.starttime.getTime()) / 60000);

    eventDiv.innerText = event.value;
    //eventDiv.style.width = `${100 / g.length}%`;
    eventDiv.style.width = "50px";
    eventDiv.style.height = 60 * duration / 60 + "px"; // duration in minutes + borders
    eventDiv.style.backgroundColor = "hsl(" + Math.random() * 360 + ", 100%, 75%)";


    eventDiv.style.position = "absolute";
    eventDiv.style.top = 20 + (startHour - 7) + (startHour - 7) * 60 + (startMinute * 60 / 60) + "px"; // header size + something with borders? + moved hour AND PLUS minutes offset
    eventDiv.style.left = 60 * event.j + "px";
    dayDiv.appendChild(eventDiv);

}

