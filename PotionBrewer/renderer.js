const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const cauldron = document.getElementById("cauldron");
const brewButton = document.getElementById("brew-button");
const uninstallInput = document.getElementById("uninstall-input");
const removeAppButton = document.getElementById("remove-app-button");
const uninstallCauldron = document.getElementById("uninstall-cauldron");
const brewUninstallButton = document.getElementById("brew-uninstall-button");
const uninstallLogOutput = document.getElementById("uninstall-log-output");

let selectedUninstallApps = [];

let selectedApps = []; // Keep track of selected apps

// Drag & Drop Support
cauldron.addEventListener("dragover", (event) => {
    event.preventDefault();
});

cauldron.addEventListener("drop", (event) => {
    event.preventDefault();
    let files = event.dataTransfer.files;

    for (let file of files) {
        let filePath = file.path;
        let ext = path.extname(filePath);

        if (ext === ".desktop") {
            fs.readFile(filePath, "utf8", (err, data) => {
                if (err) {
                    alert("Error reading the file. Make sure it's a valid .desktop file!");
                    return;
                }               

                let match = data.match(/^Exec\s*=\s*["']?([^"'\s]+)["']?/m);
                if (match) {
                    let appName = path.basename(match[1]);
                    addAppToCauldron(appName);
                }
            });
        } else {
            alert("Only .desktop files are supported for installation.");
        }
    }
});

// Function to Add App to UI & Array
function addAppToCauldron(appName) {
    if (selectedApps.includes(appName)) return; // Avoid duplicates

    selectedApps.push(appName);

    let item = document.createElement("div");
    item.classList.add("app-item");

    let text = document.createElement("span");
    text.textContent = `🧪 ${appName}`;

    let removeButton = document.createElement("button");
    removeButton.textContent = "❌";
    removeButton.classList.add("remove-button");
    
    // Click event to remove app
    removeButton.onclick = () => {
        selectedApps = selectedApps.filter(app => app !== appName);
        item.remove();
    };

    item.appendChild(text);
    item.appendChild(removeButton);
    cauldron.appendChild(item);
}


// Manual App Addition
const appInput = document.getElementById("app-input");
const addAppButton = document.getElementById("add-app-button");

addAppButton.addEventListener("click", () => {
    let appName = appInput.value.trim();
    if (appName) {
        addAppToCauldron(appName);
        appInput.value = ""; // Clear input
    }
});

// Brew Button Click Event
brewButton.addEventListener("click", () => {
    if (selectedApps.length === 0) {
        alert("No ingredients! Add apps before brewing.");
        return;
    }
    brewPotion(selectedApps);
});

// Function to Execute Installation
function brewPotion(apps) {
    playBrewingSound();
    showBrewingAnimation();

    const cauldron = document.getElementById("cauldron");
    cauldron.style.backgroundColor = "green";  // Change cauldron color for install

    const command = `bash install.sh ${apps.join(" ")}`;
    const logOutput = document.getElementById("log-output");
    logOutput.textContent = "✨ Brewing Installation Potion...\n";

    const process = exec(command);

    process.stdout.on("data", (data) => {
        logOutput.textContent += data + "\n";
    });

    process.on("close", (code) => {
        cauldron.style.backgroundColor = "#3c1e1e"; // Reset color
        if (code === 0) {
            logOutput.textContent += "✅ Potion brewed successfully! Apps installed.";
        } else {
            logOutput.textContent += "❌ Something went wrong! Potion failed.";
        }
    });
}


// Brewing Animation
function showBrewingAnimation() {
    const cauldron = document.getElementById("cauldron");

    for (let i = 0; i < 10; i++) {
        let bubble = document.createElement("div");
        bubble.classList.add("bubble");
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.backgroundColor = ["lightblue", "lightgreen", "purple", "gold"][Math.floor(Math.random() * 4)];
        cauldron.appendChild(bubble);

        let duration = 1000 + Math.random() * 3000; // 1s - 4s
        bubble.style.opacity = Math.random() * 0.5 + 0.5; // 50% - 100% opacity
        setTimeout(() => bubble.remove(), duration);

    }
}

// Play Brewing Sound
function playBrewingSound() {
    if (!window.audioPlaying) {
        window.audioPlaying = new Audio("bubbling.mp3");
        window.audioPlaying.play();
        window.audioPlaying.onended = () => (window.audioPlaying = null);
    }

}

// Load Install History
function loadInstallHistory() {
    const historyOutput = document.getElementById("history-output");

    if (!historyOutput) {
        console.error("History output element not found.");
        return;
    }

    const filePath = path.join(__dirname, "installed_apps.txt");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading history file:", err);
            historyOutput.innerHTML = "<p>No history yet.</p>";
            return;
        }

        if (!data.trim()) {
            historyOutput.innerHTML = "<p>No history yet.</p>";
            return;
        }

        let apps = data.split("\n").filter(Boolean);
        historyOutput.innerHTML = "<ul>" + apps.map(app => `<li>🧪 ${app}</li>`).join("") + "</ul>";
    });
}


uninstallCauldron.addEventListener("dragover", (event) => {
    event.preventDefault();
});

uninstallCauldron.addEventListener("drop", (event) => {
    event.preventDefault();
    let files = event.dataTransfer.files;

    for (let file of files) {
        let filePath = file.path;
        let ext = path.extname(filePath);

        if (ext === ".desktop") {
            fs.readFile(filePath, "utf8", (err, data) => {
                if (err) {
                    console.error("Error reading file:", err);
                    return;
                }

                let match = data.match(/^Exec=(\S+)/m);
                if (match) {
                    let appName = path.basename(match[1]);
                    if (!selectedUninstallApps.includes(appName)) {
                        selectedUninstallApps.push(appName);
                    
                        let item = document.createElement("div");
                        item.textContent = `🗑️ ${appName}`;
                        
                        let removeButton = document.createElement("button");
                        removeButton.textContent = "❌";
                        removeButton.onclick = () => {
                            selectedUninstallApps = selectedUninstallApps.filter(app => app !== appName);
                            item.remove();
                        };
                    
                        item.appendChild(removeButton);
                        uninstallCauldron.appendChild(item);
                    }                    

                    let item = document.createElement("p");
                    item.textContent = `🗑️ ${appName}`;
                    uninstallCauldron.appendChild(item);
                }
            });
        } else {
            alert("Only .desktop files are supported for uninstallation.");
        }
    }
});

removeAppButton.addEventListener("click", () => {
    let appName = uninstallInput.value.trim();
    if (appName) {
        selectedUninstallApps.push(appName);

        let item = document.createElement("p");
        item.textContent = `🗑️ ${appName}`;
        uninstallCauldron.appendChild(item);

        uninstallInput.value = "";
    }
});

brewUninstallButton.addEventListener("click", () => {
    if (selectedUninstallApps.length === 0) {
        alert("No ingredients! Add apps before brewing.");
        return;
    }
    brewUninstallPotion(selectedUninstallApps);
});

function brewUninstallPotion(apps) {
    playBrewingSound();
    showBrewingAnimation();

    const cauldron = document.getElementById("cauldron");
    cauldron.style.backgroundColor = "red";  // Change cauldron color for uninstall

    const command = `bash uninstall.sh ${apps.join(" ")}`;
    uninstallLogOutput.textContent = "🗑️ Brewing Uninstall Potion...\n";

    const process = exec(command);

    process.stdout.on("data", (data) => {
        uninstallLogOutput.textContent += data + "\n";
    });

    process.on("close", (code) => {
        cauldron.style.backgroundColor = "#3c1e1e"; // Reset color
        if (code === 0) {
            uninstallLogOutput.textContent += "✅ Potion brewed successfully! Apps removed.";
        } else {
            uninstallLogOutput.textContent += "❌ Something went wrong! Potion failed.";
        }
    });
}


// Load History on Startup
window.onload = loadInstallHistory;
