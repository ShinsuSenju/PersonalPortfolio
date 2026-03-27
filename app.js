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
  dateDisplay.innerText = `${day}/${month}/${year}`;
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

document.addEventListener("contextmenu", (e) => {
  if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
    e.preventDefault();
  }
});

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

const desktopIconsContainer = document.querySelector(".desktop-icons");

function closeContextMenu() {
  document.getElementById("context-menu").style.display = "none";
}

document.addEventListener("click", (e) => {
  if (e.target !== contextMenu && !contextMenu.contains(e.target)) {
    closeContextMenu();
  }
});

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
const hackBtn = document.getElementById("menu-hack");
const hackText = hackBtn.querySelector("a");
let hackStep = 0;

hackBtn.addEventListener("click", (e) => {
  e.preventDefault();

  e.stopPropagation();

  if (hackStep === 0) {
    hackText.innerText = "Wait... are you sure?";
    hackText.style.color = "#cc0000";
    hackBtn.removeAttribute("aria-disabled");
    hackStep = 1;
  } else {
    alert(
      "BREACH DETECTED. GOOGLE CYBERSECURITY INBOUND... just kidding. Nice click!",
    );
    hackText.innerText = "Hack Google";
    hackText.style.color = "";
    hackBtn.setAttribute("aria-disabled", "true");
    hackStep = 0;
    document.getElementById("context-menu").style.display = "none";
  }
});
document.addEventListener("click", (e) => {
  const contextMenu = document.getElementById("context-menu");
  if (e.target !== contextMenu && !contextMenu.contains(e.target)) {
    contextMenu.style.display = "none";

    if (hackStep === 1) {
      hackText.innerText = "Hack Google";
      hackText.style.color = "";
      hackBtn.setAttribute("aria-disabled", "true");
      hackStep = 0;
    }
  }
});

// Portfolio Link: View Source
document.getElementById("menu-source").addEventListener("click", (e) => {
  e.preventDefault();
  window.open("https://github.com/ShinsuSenju/PersonalPortfolio", "_blank");
  closeContextMenu();
});

// Portfolio Link: My Projects
// document.getElementById("menu-projects").addEventListener("click", (e) => {
//   e.preventDefault();
//   alert("Opening Projects Window... (Coming Soon!)");
//   closeContextMenu();
// });

//windows
let highestZIndex = 100;

function focusWindow(windowElement) {
  highestZIndex++;
  windowElement.style.zIndex = highestZIndex;
  document
    .querySelectorAll(".window")
    .forEach((win) => win.classList.remove("active"));
  document
    .querySelectorAll(".aero-taskbar-icon")
    .forEach((icon) => icon.classList.remove("app-active"));
  windowElement.classList.add("active");
  const baseName = windowElement.id.replace("-window", "");
  const activeIcon = document.getElementById(`taskbar-${baseName}`);
  if (activeIcon) {
    activeIcon.classList.add("app-active");
  }
}

function openWindow(windowId) {
  const win = document.getElementById(windowId);
  if (win) {
    win.classList.remove("window-closed");
    win.classList.remove("minimized");
    focusWindow(win);
  }

  const baseName = windowId.replace("-window", "");
  const taskbarBtn = document.getElementById(`taskbar-${baseName}`);
  if (taskbarBtn) {
    taskbarBtn.style.display = "flex";
  }
}

//my projects from context menu

const projectsBtn = document.getElementById("menu-projects");
if (projectsBtn) {
  projectsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openWindow("projects-window");
    closeContextMenu();
  });
}

//close btn title bar
document.querySelectorAll(".titlebar-close").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const parentWindow = e.target.closest(".window");
    if (parentWindow) {
      parentWindow.classList.add("window-closed");
      const baseName = parentWindow.id.replace("-window", "");
      const taskbarBtn = document.getElementById(`taskbar-${baseName}`);
      if (taskbarBtn) {
        taskbarBtn.style.display = "none";
      }
    }
  });
});

// focus window
document.querySelectorAll(".window").forEach((win) => {
  win.addEventListener("mousedown", () => {
    focusWindow(win);
  });
});

//defocus
desktop.addEventListener("mousedown", (e) => {
  if (e.target.id === "desktop") {
    document.querySelectorAll(".window").forEach((win) => {
      win.classList.remove("active");
    });
  }
});

//maximize
document.querySelectorAll(".titlebar-max").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const parentWindow = e.target.closest(".window");
    if (parentWindow) {
      parentWindow.classList.toggle("maximized");
    }
  });
});

document.querySelectorAll(".title-bar").forEach((bar) => {
  bar.addEventListener("dblclick", (e) => {
    if (e.target.closest(".title-bar-controls")) return;
    const parentWindow = e.target.closest(".window");
    if (parentWindow) {
      parentWindow.classList.toggle("maximized");
    }
  });
});

//minimize
const windowProjects = document.getElementById("projects-window");
const taskBarProjectsBtn = document.getElementById("taskbar-projects");
const projectsPeekThumb = taskBarProjectsBtn.querySelector(".peek-thumb");

document.querySelectorAll(".titlebar-min").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const parentWindow = e.target.closest(".window");
    if (parentWindow) {
      parentWindow.classList.add("minimized");
      parentWindow.classList.remove("active");
    }
  });
});

if (taskBarProjectsBtn) {
  taskBarProjectsBtn.addEventListener("click", () => {
    if (windowProjects.classList.contains("window-closed")) {
      windowProjects.classList.remove("window-closed");
      windowProjects.classList.remove("minimized");
      focusWindow(windowProjects);
    } else if (windowProjects.classList.contains("minimized")) {
      windowProjects.classList.remove("minimized");
      focusWindow(windowProjects);
    } else if (!windowProjects.classList.contains("active")) {
      focusWindow(windowProjects);
    } else {
      windowProjects.classList.add("minimized");
      windowProjects.classList.remove("active");
    }
  });

  //thumbnail

  taskBarProjectsBtn.addEventListener("mouseenter", () => {
    projectsPeekThumb.innerHTML = "";

    const freshClone = windowProjects.cloneNode(true);
    freshClone.removeAttribute("id");
    freshClone.classList.add("window-clone");

    freshClone.classList.remove(
      "minimized",
      "window-closed",
      // "active",
      "maximized",
      "dragging",
    );

    const fixedWidth = 600;
    const fixedHeight = 400;

    const thumbWidth = projectsPeekThumb.clientWidth;

    const exactScale = thumbWidth / fixedWidth;

    freshClone.style.cssText = `
      position: absolute !important;
      top: 50% !important;
      left: 50% !important;
      width: ${fixedWidth}px !important;
      height: ${fixedHeight}px !important;
      max-width: none !important;
      max-height: none !important;
      margin: 0 !important;
      transform-origin: center !important;
      transform: translate(-50%, -50%) scale(${exactScale}) !important;
      pointer-events: none !important;
      
     
      display: flex !important; 
      flex-direction: column !important;
    `;

    projectsPeekThumb.appendChild(freshClone);
  });
}

//dragging and grab logic
document.querySelectorAll(".window").forEach((win) => {
  const titleBar = win.querySelector(".title-bar");

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  //grab
  titleBar.addEventListener("mousedown", (e) => {
    const rect = win.getBoundingClientRect();
    isDragging = true;
    win.classList.add("dragging");
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    focusWindow(win);
  });

  //drag
  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    if (win.classList.contains("maximized")) {
      win.classList.remove("maximized");
      const rect = win.getBoundingClientRect();
      offsetX = rect.width / 2;
      offsetY = 15;
    }
    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;

    win.style.left = `${newX}px`;
    win.style.top = `${newY}px`;
  });

  //release
  document.addEventListener("mouseup", () => {
    isDragging = false;
    win.classList.remove("dragging");
  });
});
