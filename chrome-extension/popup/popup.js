import { BACKEND_API_URL } from '../env.js'

async function requestAPI(data, endpoint) {
    const response = await fetch(`${BACKEND_API_URL}/workspace/${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const json = await response.json()
    return json
}

chrome.tabs.query({active: true, currentWindow: true}, async (tabs) => {
    if (tabs.length === 0) {
        return
    }

    chrome.tabs.sendMessage(
        tabs[0].id,
        {action: "get_page_content"},
        async (response) => {
            await requestAPI(response, "index");
        }
    );
});

const button = document.querySelector(".send-button");
const input = document.querySelector(".input-box");

async function handleUserInput() {
    const messages = document.querySelector(".messages");

    const userInput = input.value;
    input.value = "";

    const messageUser = document.createElement("div");
    messageUser.innerText = userInput;
    messageUser.classList.add("message", "user");
    messages.appendChild(messageUser);

    chrome.tabs.query({active: true, currentWindow: true}, async (tabs) => {
        if (tabs.length === 0) {
            return
        }
    
        chrome.tabs.sendMessage(
            tabs[0].id,
            {action: "get_page_content"},
            async (response) => {
                response["input"] = userInput
                const result = await requestAPI(response, "solution");
                
                const messageBot = document.createElement("div");
                messageBot.innerText = result.solution.response?.trim();
                messageBot.classList.add("message", "bot");
                messages.appendChild(messageBot);
            }
        );
    });
}

input.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await handleUserInput()
    }
});

button.addEventListener("click", async () => {
    await handleUserInput()
});
