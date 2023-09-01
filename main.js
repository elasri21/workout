import allExercises from './gym.json' assert {type: "json"};
//console.log(JSON.stringify(allExercises));
const myObject = allExercises;
const workName = Object.keys(myObject);
const sugesion = document.querySelector(".sugesion");
let exArr = [];
workName.forEach(work => {
    let divWork = document.createElement("div");
    let h3 = document.createElement("h3");
    let tit = document.createTextNode(work);
    h3.appendChild(tit);
    divWork.appendChild(h3);
    myObject[work].forEach(ex => {
        exArr.push(ex);
        let link = document.createElement("a");
        link.setAttribute("href", ex[1]);
        link.setAttribute("target", "_blank");
        let linkTxt = document.createTextNode(ex[0]);
        link.appendChild(linkTxt);
        divWork.appendChild(link);
    });
    sugesion.appendChild(divWork);
});



// Handle the date
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();

let dateContainer = document.querySelector(".date");
let spanYear = document.createElement("span");
let textYear = document.createTextNode(year);
spanYear.appendChild(textYear);

let spanMonth = document.createElement("span");
let textMonth = document.createTextNode(month);
spanMonth.appendChild(textMonth);

let spanDay = document.createElement("span");
let textDay = document.createTextNode(day);
spanDay.appendChild(textDay);

dateContainer.appendChild(spanYear);
dateContainer.appendChild(spanDay);
dateContainer.appendChild(spanMonth);
let ex = [];

// add workout
const addWorkout = document.querySelector(".add-workout");
const workouts = document.querySelector(".workouts .exercices");
const field = document.querySelector(".field");
addWorkout.addEventListener("click", function() {
    let exercice = field.value;
    // create box to hold the workout
    if (exercice != "") {
    let holder = document.createElement("div");
    holder.setAttribute("class", "holder");
    holder.innerHTML = `
    <p>${exercice}</p>
    `;
    workouts.appendChild(holder);
    ex.push(exercice);
    localStorage.setItem("workout", JSON.stringify(ex));
    }
field.value = "";
});

/* chose workout */
const workoutNames = Array.from(document.querySelectorAll(".workout-names span"));
const workoutName = document.querySelector(".workout-name");
workoutNames.forEach(w => {
    w.addEventListener("click", function() {
        for(let i = 0; i < workoutNames.length; i++) {
            workoutNames[i].classList.remove("active");
        }
        this.classList.add("active");
        localStorage.clear("workout");
        workouts.textContent = "";
        workoutName.innerHTML = "<i class=\"fa-solid fa-dumbbell\"></i>" + this.textContent;
        localStorage.setItem("title", this.textContent);
        sugesion.style.display = "block";
    });
});

window.addEventListener("load", function () {
    if (localStorage.getItem("workout")) {
        let data = localStorage.getItem("workout");
        data = JSON.parse(data);
        workoutName.innerHTML = `<i class=\"fa-solid fa-dumbbell\"></i> ${localStorage.getItem("title")}`;
       data.forEach(item => {
            let holder = document.createElement("div");
            holder.setAttribute("class", "holder");
            holder.innerHTML = `
            <p>${item}</p>
            `;
            workouts.appendChild(holder);
        });
    }

});

// close exercises sugession
const closeBtn = document.querySelector(".sugesion i");
closeBtn.addEventListener("click", function() {
    this.parentElement.style.display = "none";
});



