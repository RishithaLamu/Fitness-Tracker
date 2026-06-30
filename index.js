
const today = new Date().toISOString().split("T")[0];

// Display today's date
const dateHeading = document.getElementById("current-date");

const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};

dateHeading.textContent =
    new Date().toLocaleDateString("en-US", options);

let history = JSON.parse(localStorage.getItem("fitnessHistory")) || {};


// SAVE DATA


function saveProgress() {

    // Calculate total calories burned
    const cardioCalories =
        Number(document.getElementById("cardio-calories").value) || 0;

    const strengthCalories =
        Number(document.getElementById("strength-calories").value) || 0;

    const yogaCalories =
        Number(document.getElementById("yoga-calories").value) || 0;

    const totalBurned =
        cardioCalories +
        strengthCalories +
        yogaCalories;


    history[today] = {

        cardioComplete:
            document.getElementById("cardio-complete").checked,

        cardioDuration:
            document.getElementById("cardio-duration").value,

        cardioCalories,

        strengthComplete:
            document.getElementById("strength-complete").checked,

        strengthDuration:
            document.getElementById("strength-duration").value,

        strengthCalories,

        yogaComplete:
            document.getElementById("yoga-complete").checked,

        yogaDuration:
            document.getElementById("yoga-duration").value,

        yogaCalories,

        breakfast:
            document.querySelectorAll(".meal input")[0].value,

        lunch:
            document.querySelectorAll(".meal input")[1].value,

        dinner:
            document.querySelectorAll(".meal input")[2].value,

        caloriesIntake:
            document.getElementById("calories").value,

        water:
            document.getElementById("water").value,

        sleep:
            document.getElementById("sleep").value,

        weight:
            document.getElementById("weight").value,

        caloriesBurned:
            totalBurned
    };

    localStorage.setItem(
        "fitnessHistory",
        JSON.stringify(history)
    );

    alert("Today's progress saved!");
}


// LOAD DATA


function loadProgress() {

    if (!history[today]) return;

    const data = history[today];

    document.getElementById("cardio-complete").checked =
        data.cardioComplete;

    document.getElementById("cardio-duration").value =
        data.cardioDuration;

    document.getElementById("cardio-calories").value =
        data.cardioCalories;

    document.getElementById("strength-complete").checked =
        data.strengthComplete;

    document.getElementById("strength-duration").value =
        data.strengthDuration;

    document.getElementById("strength-calories").value =
        data.strengthCalories;

    document.getElementById("yoga-complete").checked =
        data.yogaComplete;

    document.getElementById("yoga-duration").value =
        data.yogaDuration;

    document.getElementById("yoga-calories").value =
        data.yogaCalories;

    document.querySelectorAll(".meal input")[0].value =
        data.breakfast;

    document.querySelectorAll(".meal input")[1].value =
        data.lunch;

    document.querySelectorAll(".meal input")[2].value =
        data.dinner;

    document.getElementById("calories").value =
        data.caloriesIntake;

    document.getElementById("water").value =
        data.water;

    document.getElementById("sleep").value =
        data.sleep;

    document.getElementById("weight").value =
        data.weight;
}

// SAVE BUTTON


document
.querySelector(".save-btn")
.addEventListener("click", saveProgress);

window.onload = loadProgress;

// AUTHENTICATION

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    const password = event.target.password.value;
    if (!isValidPassword(password)) {
        alert('Password does not meet security criteria.');
        event.preventDefault();
    }
});
function isValidPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

const bcrypt = require('bcrypt');
const saltRounds = 10;
const plainTextPassword = 'userPassword';
bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
    if (err) throw err;
    // Store hash in your password database.
    console.log('Hashed Password:', hash);
});

bcrypt.compare(plainTextPassword, storedHash, (err, result) => {
    if (result) {
        console.log('Authentication successful');
        // Proceed with session creation or token generation
    } else {
        console.log('Authentication failed');
        // Handle failed authentication
    }
});


const session = require('express-session');
const express = require('express');
const app = express();
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.post('/login', (req, res) => {
    // After successful authentication
    req.session.userId = user.id;
    res.send('Login successful');
});