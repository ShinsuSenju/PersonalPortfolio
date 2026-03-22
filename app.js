const bootScreen = document.getElementById("boot");
const loginScreen = document.getElementById("login-screen");
const logo = document.querySelector(".win-logo img");
const bootText = document.querySelector(".boot-text");

window.onload = () => {
  setTimeout(() => {
    logo.style.opacity = "1";
    bootText.style.opacity = "1";
  }, 500);

  setTimeout(() => {
    bootScreen.classList.add("hidden");
    loginScreen.classList.remove("hidden");
  }, 4000);
};

const loginBtn = document.querySelector(".blue-arrow-btn");
const passwordInput = document.querySelector(".login-input");
const hintDisplay = document.getElementById("password-hint");
const wikiCard = document.getElementById("wiki-card");
const desktop = document.getElementById("desktop");
const welcomeScreen = document.getElementById("welcome-screen");

// Old: const SECRET_PASSWORD = "linus";

const VALID_PASSWORDS = ["linus", "linus torvalds", "torvalds"];

let failedAttempts = 0;
let isTauntActive = false;

function attemptLogin() {
  const userGuess = passwordInput.value.toLowerCase().trim();
  if (VALID_PASSWORDS.includes(userGuess)) {
    loginScreen.classList.add("hidden");
    welcomeScreen.classList.remove("hidden");
    setTimeout(() => {
      welcomeScreen.classList.add("hidden");
      const audio = new Audio("startup.mp3");
      audio.play().catch((e) => console.log("Audio Blocked"));
      setTimeout(() => {
        desktop.classList.remove("hidden");
      }, 500);
    }, 3000);

    return;
  }

  if (isTauntActive) {
    passwordInput.value = "linus";

    hintDisplay.innerText = "There you go. Now hit the arrow to boot up.";
    hintDisplay.style.color = "#ffffff";

    wikiCard.classList.remove("hidden");
    setTimeout(() => wikiCard.classList.add("show"), 10);

    isTauntActive = false;
    return;
  }

  failedAttempts++;
  passwordInput.value = "";
  passwordInput.focus();

  passwordInput.classList.add("input-error");
  setTimeout(() => {
    passwordInput.classList.remove("input-error");
  }, 400);

  hintDisplay.classList.remove("hidden");
  setTimeout(() => hintDisplay.classList.add("show"), 10);

  if (failedAttempts === 1) {
    hintDisplay.innerText =
      "Hint: The creator of a much better, open-source OS (kernel actually!)...";
    hintDisplay.style.color = "white";
  } else if (failedAttempts >= 2) {
    hintDisplay.innerText =
      "Typical Windows user... Just switch to Linux already. Press Enter to admit defeat and get the password.";
    hintDisplay.style.color = "#ffffff";
    isTauntActive = true;
  }
}

loginBtn.addEventListener("click", attemptLogin);
passwordInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    attemptLogin();
  }
});

// DESKTOP LOGIC

//Clock Function
function updateClock() {
  const timeDisplay = document.getElementById("time-display");
  const dateDisplay = document.getElementById("date-display");
  if (!timeDisplay || !dateDisplay) return;
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const year = now.getFullYear();
  timeDisplay.innerText = `${hours}:${minutes} ${ampm}`;
  dateDisplay.innerText = `${month}/${day}/${year}`;
}
updateClock();
setInterval(updateClock, 10000);

// START MENU
const startBtn = document.getElementById("start-button");
const startMenu = document.getElementById("start-menu");

startBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  startMenu.classList.toggle("show");
});

document.addEventListener("click", (event) => {
  if (
    startMenu.classList.contains("show") &&
    !startMenu.contains(event.target)
  ) {
    startMenu.classList.remove("show");
  }
});
startMenu.addEventListener("click", (event) => {
  event.stopPropagation();
});
