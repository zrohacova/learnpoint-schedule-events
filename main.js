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
    { value: "Lecture 1", starttime: "14:20", end: "15:15", duration: 55, day: "Thu" },
    { value: "Lecture 2", starttime: "14:20", end: "16:50", duration: 135, day: "Thu" },
    { value: "Lecture 3", starttime: "14:50", end: "16:50", duration: 30, day: "Thu" },
]


for (const event of events) {
    const dayDiv = document.getElementById(event.day);
    const eventDiv = document.createElement("div");

    const startHour = event.starttime.split(":")[0]
    const startMinute = event.starttime.split(":")[1]

    eventDiv.innerText = event.value;
    //eventDiv.style.width = "100%"
    eventDiv.style.height = 60 * event.duration / 60 + "px"; // duration in minutes + borders
    eventDiv.style.backgroundColor = getRandomColor();   

    
    eventDiv.style.position = "absolute";
    eventDiv.style.top = 20 + (startHour - 7) + (startHour - 7) * 60 + (startMinute * 60 / 60) + "px"; // header size + something with borders? + moved hour AND PLUS minutes offset


   
    dayDiv.appendChild(eventDiv)


}

function getRandomColor() {
    color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
    return color;
}

