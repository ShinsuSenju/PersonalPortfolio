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
      const audio = new Audio("./audio/startup.mp3");
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

//Context Menu

const contextMenu = document.querySelector("#context-menu");

desktop.addEventListener("contextmenu", (e) => {
  e.preventDefault();

  contextMenu.style.display = "block";

  let mouseX = e.clientX;
  let mouseY = e.clientY;

  const menuWidth = contextMenu.offsetWidth;
  const menuHeight = contextMenu.offsetHeight;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (mouseX + menuWidth > windowWidth) {
    mouseX = windowWidth - menuWidth;
  }

  if (mouseY + menuHeight > windowHeight) {
    mouseY = windowHeight - menuHeight;
  }

  contextMenu.style.left = `${mouseX}px`;
  contextMenu.style.top = `${mouseY}px`;
});

document.addEventListener("click", (e) => {
  if (e.target !== contextMenu && !contextMenu.contains(e.target)) {
    contextMenu.style.display = "none";
  }
});

const desktopIconsContainer = document.querySelector(".desktop-icons");

function closeContextMenu() {
  document.getElementById("context-menu").style.display = "none";
}

document.getElementById("example15").addEventListener("change", () => {
  desktopIconsContainer.className = "desktop-icons large";
  closeContextMenu();
});

document.getElementById("example16").addEventListener("change", () => {
  desktopIconsContainer.className = "desktop-icons";
  closeContextMenu();
});

document.getElementById("example17").addEventListener("change", () => {
  desktopIconsContainer.className = "desktop-icons small";
  closeContextMenu();
});

document.getElementById("menu-refresh").addEventListener("click", (e) => {
  e.preventDefault();
  const icons = document.querySelectorAll(".desktop-icons .icon");

  icons.forEach((icon) => (icon.style.opacity = "0"));

  setTimeout(() => {
    icons.forEach((icon) => (icon.style.opacity = "1"));
  }, 150);

  closeContextMenu();
});

// Sorting

function sortDesktopIcons(criterion) {
  const iconsArray = Array.from(desktopIconsContainer.children);
  iconsArray.sort((a, b) => {
    if (criterion === "name") {
      // Alphabetical sort (A to Z)
      const textA = a.querySelector("span").innerText.toLowerCase();
      const textB = b.querySelector("span").innerText.toLowerCase();
      return textA.localeCompare(textB);
    } else if (criterion === "type") {
      return Math.random() - 0.5;
    }
  });

  iconsArray.forEach((icon) => desktopIconsContainer.appendChild(icon));
}

document.getElementById("sort-name").addEventListener("click", (e) => {
  e.preventDefault();
  sortDesktopIcons("name");
  document.getElementById("context-menu").style.display = "none";
});

document.getElementById("sort-type").addEventListener("click", (e) => {
  e.preventDefault();
  sortDesktopIcons("type");
  document.getElementById("context-menu").style.display = "none";
});
const wallpapers = [
  "url('./images/wallpaper.jpg')",
  "url('./images/wallpaper1.jpg')",
  "url('./images/wallpaper2.jpg')",
  "url('./images/wallpaper3.jpg')",
  "url('./images/wallpaper4.jpg')",
];
let currentWallpaper = 0;

document.getElementById("menu-personalize").addEventListener("click", (e) => {
  e.preventDefault();
  currentWallpaper++;
  if (currentWallpaper >= wallpapers.length) currentWallpaper = 0;

  desktop.style.backgroundImage = wallpapers[currentWallpaper];
  desktop.style.backgroundSize = "cover";

  closeContextMenu();
});

// Easter Egg 1: Callback to the login screen joke
document.getElementById("menu-linux").addEventListener("click", (e) => {
  e.preventDefault();
  alert(
    "Error 404: Linux ISO not found. I guess we are stuck with Windows 7 for now.",
  );
  closeContextMenu();
});

// Easter Egg 2: Hack Google
document.getElementById("menu-hack").addEventListener("click", (e) => {
  e.preventDefault();
  alert("Access granted. Initializing bypass protocol...");
  closeContextMenu();
});

// Portfolio Link: View Source
document.getElementById("menu-source").addEventListener("click", (e) => {
  e.preventDefault();
  window.open("https://github.com/ShinsuSenju/PersonalPortfolio", "_blank");
  closeContextMenu();
});

// Portfolio Link: My Projects
document.getElementById("menu-projects").addEventListener("click", (e) => {
  e.preventDefault();
  alert("Opening Projects Window... (Coming Soon!)");
  closeContextMenu();
});
