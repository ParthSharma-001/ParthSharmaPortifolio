const API_KEY = "AIzaSyAShTl6VStaSL_ATVzVK4A65xUnnSbyBBM"; // Replace with your API key
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

async function sendMessage() {
    let message = userInput.value.trim();
    if (message === "") return;

    appendMessage("user", message);
    userInput.value = "";

    try {
        let response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: message
                    }]
                }]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }

        let data = await response.json();
        console.log("API Response:", data); // Debug log

        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            let reply = data.candidates[0].content.parts[0].text;
            appendMessage("bot", reply);
        } else {
            appendMessage("bot", "Sorry, I couldn't generate a response.");
        }
    } catch (error) {
        console.error("Error details:", error);
        appendMessage("bot", "Error: " + error.message);
    }
}

// ...rest of the code remains the same...

function appendMessage(sender, text) {
    let msgDiv = document.createElement("div");
    msgDiv.classList.add("message", sender);
    msgDiv.textContent = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Add event listener for Enter key
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});


const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const chatContainer = document.querySelector('.chat-container');
const inputField = document.querySelector('input');
const sendButton = document.querySelector('button');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    chatContainer.classList.toggle('light-mode');
    inputField.classList.toggle('light-mode');
    sendButton.classList.toggle('light-mode');

    // Toggle message styles as well
    const userMessages = document.querySelectorAll('.message.user');
    userMessages.forEach(msg => msg.classList.toggle('light-mode'));

    const botMessages = document.querySelectorAll('.message.bot');
    botMessages.forEach(msg => msg.classList.toggle('light-mode'));
});


// function for refresh chat 
function refreshChat() {
    document.getElementById('chat-box').innerHTML = '';
}