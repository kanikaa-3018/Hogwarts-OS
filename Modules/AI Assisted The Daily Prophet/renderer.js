const { ipcRenderer } = require("electron");

document.addEventListener("DOMContentLoaded", () => {
    // 🏆 Hogwarts Crest ASCII Art
    const asciiArt = `
     _    _                             _     _           
    | |  | |                           (_)   | |          
    | |__| |  ___  _ __  _ __   ___  ___  ___| |_   ___   
    |  __  | / _ \\| '_ \\| '_ \\ / _ \\/ __|/ _ \\ __| / _ \\  
    | |  | ||  __/| |_) | |_) |  __/\\__ \\  __/ |_ | (_) | 
    |_|  |_| \\___|| .__/| .__/ \\___||___/\\___|\\__| \\___/  
                  | |   | |
                  |_|   |_|
    `;
    document.getElementById("ascii-art").textContent = asciiArt;

    // 🔮 Fetch AI-generated newspaper content
    ipcRenderer.invoke("fetch-agent-intro").then((message) => {
        document.getElementById("ai-response").innerHTML = formatNewspaperText(message);
        speakText(message);
    }).catch(err => {
        console.error("Error fetching AI response:", err);
        const errorMessage = "The Ministry of Magic is currently investigating an issue. Try again later.";
        document.getElementById("ai-response").textContent = errorMessage;
        speakText(errorMessage);
    });
});
window.addEventListener("beforeunload", () => {
  ipcRenderer.send("stop-speech"); // Stop AI voice when closing
});
// 📜 Formats AI response like a newspaper
function formatNewspaperText(text) {
    return `<strong>📰 Breaking News from Hogwarts:</strong><br><br>` + text.replace(/\n/g, "<br>");
}

// 🗣 Makes the AI read the newspaper content aloud
function speakText(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-GB";  // British accent for authenticity 🇬🇧
    speech.rate = 0.9;  // Slightly slower for readability
    speech.pitch = 1.2;  // A bit of a mystical tone
    speechSynthesis.speak(speech);
}


// 🕰️ Update date and time
function updateDateTime() {
    const now = new Date();
    document.getElementById("date-time").textContent = `⏳ Time: ${now.toLocaleTimeString()}`;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// 🌦️ Fetch Weather for Hogwarts (Fake API Example)
async function fetchWeather() {
    document.getElementById("weather").textContent = "🌦️ Weather: Cloudy with a chance of broomsticks!";
}
fetchWeather();
