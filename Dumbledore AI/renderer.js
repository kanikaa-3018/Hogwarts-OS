const { ipcRenderer } = require("electron");

document.getElementById("send-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    displayMessage(userInput, "user");

    try {
        const botResponse = await ipcRenderer.invoke("send-message", userInput);
        displayMessage(botResponse, "bot");
    } catch (error) {
        displayMessage("Error: AI did not respond.", "bot");
        console.error(error);
    }
});

function displayMessage(message, sender) {
    const messagesDiv = document.getElementById("messages");
    const msgDiv = document.createElement("div");
    msgDiv.classList.add(sender);
    msgDiv.textContent = `${sender === "user" ? "🧑" : "🧙‍♂️"} ${message}`;
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
