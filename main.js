const groups =
    [
        { id: 0, code: "Yh-skolan", value: "Yh-skolan", parent: null, active: true },
        { id: 1, value: "Javautvecklare", code: "JAV", parent: null, active: true },
        { id: 5, value: "Examensarbete", code: "JAV_EXA", parent: 1, active: true },
        { id: 6, value: "Grunder i Java", code: "JAV_GIJ", parent: 1, active: true },
        { id: 8, value: "LIA 1", code: "JAV_LIA", parent: 1, active: false },
        { id: 2, value: "Redovisningekonom", code: "REK", parent: null, active: true },
        { id: 9, value: "Skattelagstifning", code: "REK_SKA", parent: 2, active: true },
        { id: 10, value: "Årsredovisningar och bokslut", code: "REK_AOB", parent: 2, active: true },
        { id: 11, value: "LIA 2", code: "REK_LIA2", parent: 2, active: true },
        { id: 12, value: "LIA 1", code: "REK_LIA1", parent: 2, active: true },
        { id: 13, value: "Redovisning inom offentlig sektor", code: "REK_ReOf", parent: 2, active: false },
        { id: 14, value: "Handelsrätt", code: "REK_HR", parent: 2, active: false },
        { id: 15, value: "Ekonomistyrning", code: "REK_Ekos", parent: 2, active: false },
        { id: 3, value: "Tandsköterska", code: "TAN", parent: null, active: true },
        { id: 4, value: "Arkitektur", code: "ARK", parent: null, active: false }
    ]

const students = [
    { id: 0, name: "Stig Berg" },
    { id: 1, name: "Lise Berg" },
    { id: 2, name: "Göte Borg" },
    { id: 3, name: "Red Berg" },
]

const personal = [
    { id: 0, name: "Karl Kalkyl" },
    { id: 1, name: "Tina Isberg" },
]


const groupFilter = document.getElementsByClassName("groups-filter")[0];
for (const element of groups) {
    const html = `
    <div class="group-row-${element.parent ? "course" : "program"}">
        <input type="checkbox" value="${element.value}" id="group-${element.id}">
        <label>${element.value}</label>
    </div>
    `

    groupFilter.insertAdjacentHTML("beforeend", html)
}

const studentFilter = document.getElementsByClassName("students-filter")[0];
for (const element of students) {
    const html = `
    <div class="user-row">
        <input type="checkbox" value="${element.name}" id="student-${element.id}">
        <label>${element.name}</label>
    </div>
    `

    studentFilter.insertAdjacentHTML("beforeend", html)
}

const events = [
    { value: "Activity", starttime: "10:00", end: "11:00", duration: 60, day: "Mon" },
    { value: "Lab", starttime: "12:30", end: "14:00", duration: 90, day: "Tue" },
    { value: "Lecture 1", starttime: "14:00", end: "15:00", duration: 60, day: "Thu" },
    { value: "Lecture 2", starttime: "14:30", end: "15:30", duration: 60, day: "Thu" },
    { value: "Lecture 3", starttime: "15:00", end: "15:50", duration: 50, day: "Thu" },
]
let i = 0;

function layoutEvents(events) {
    const overlappingGroups = [];
    let currentGroup = [];
    let lastEventEnding = null;

    for (const ev of events) {
        if (lastEventEnding !== null && ev.starttime >= lastEventEnding) {
            overlappingGroups.push(currentGroup);
            currentGroup = [];
            lastEventEnding = null;
        }

        currentGroup.push(ev);

        if (lastEventEnding === null || ev.end > lastEventEnding) {
            lastEventEnding = ev.end;
        }
    }

    overlappingGroups.push(currentGroup);

    return overlappingGroups;
}

const overlappingGroups = layoutEvents(events);
overlappingGroups.forEach((group, i) => {
    console.log(`Group ${i + 1}:`);
    group.forEach((ev) => console.log(`  - ${ev.value} (${ev.starttime}–${ev.end})`));
});

// visualization - groups
for (const g of overlappingGroups) {
    const dayDiv = document.getElementById(g[0].day);

    const gStartHour = g[0].starttime.split(":")[0];

    const groupDivWrapper = document.createElement("div");
    groupDivWrapper.style.width = dayDiv.offsetWidth;
    groupDivWrapper.style.position = "absolute";
    groupDivWrapper.style.top = 20 + (gStartHour - 7) + (gStartHour - 7) * 60 + "px";

    dayDiv.appendChild(groupDivWrapper);

    const groupDiv = document.createElement("div");
    groupDiv.classList.add("calendar-events-group");
    // groupDiv.style.width = dayDiv.offsetWidth;
    // groupDiv.style.position = "absolute";
    // groupDiv.style.top = 20 + (startHour - 7) + (startHour - 7) * 60 + "px";

    for (const event of g) {
        const eventDiv = document.createElement("div");

        const startHour = event.starttime.split(":")[0]
        const startMinute = event.starttime.split(":")[1]

        eventDiv.innerText = event.value;
        // eventDiv.style.width = `${100 / g.length}%`;
        eventDiv.style.height = (((startHour - gStartHour) * 60) + (startMinute * 60 / 60)) + 60 * event.duration / 60 + "px"; // duration in minutes + borders
        eventDiv.style.backgroundColor = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
        // eventDiv.style.position = "absolute";
        // eventDiv.style.top = ((startHour - gStartHour) * 60) + (startMinute * 60 / 60) + "px"



        // eventDiv.style.position = "absolute";
        // eventDiv.style.top = 20 + (startHour - 7) + (startHour - 7) * 60 + (startMinute * 60 / 60) + "px"; // header size + something with borders? + moved hour AND PLUS minutes offset
        groupDiv.append(eventDiv)

    }

    groupDivWrapper.appendChild(groupDiv);
}





// visualization 

// i = 0;

// while (i < events.length) {
//     const event = events[i];

//     const dayDiv = document.getElementById(event.day);
//     const eventDiv = document.createElement("div");

//     const startHour = event.starttime.split(":")[0]
//     const startMinute = event.starttime.split(":")[1]

//     let overlappingForCurrent = 0;
//     for (let j = i + 1; j < events.length; j++) {
//         const nextEvent = events[j];

//         if (event.starttime < nextEvent.end && event.end > event.starttime) {
//             overlappingForCurrent++;
//         }

//     }

//     eventDiv.innerText = event.value;
//     eventDiv.style.width = `${100 / (overlappingForCurrent + 1)}%`;
//     eventDiv.style.height = 60 * event.duration / 60 + "px"; // duration in minutes + borders
//     eventDiv.style.backgroundColor = "hsl(" + Math.random() * 360 + ", 100%, 75%)";


//     eventDiv.style.position = "absolute";
//     eventDiv.style.top = 20 + (startHour - 7) + (startHour - 7) * 60 + (startMinute * 60 / 60) + "px"; // header size + something with borders? + moved hour AND PLUS minutes offset

//     dayDiv.appendChild(eventDiv)
//     i++;
// }

