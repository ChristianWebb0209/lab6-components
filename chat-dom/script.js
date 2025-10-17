import { getBotResponse } from "../eliza.js";

document.addEventListener("DOMContentLoaded", __init);


function __init() {
    // add event listener for input button
    document.getElementById("send-button").addEventListener("click", sendMessage);

}

function addMessage(message, user) {

    // get from DOM section of messages
    let section = document.getElementById("chat-container");

    // create message container
    let messageContainer = document.createElement("div");
    messageContainer.className = user == "user" ? "user-message" : "bot-message";

    // create the text itself
    let messageText = document.createElement("div");
    messageText.className = "message-text";
    messageText.textContent = message;

    // decide which emoji based on user or not
    const emojiText = user == "user" ? "🧑" : "👽";

    if (user == "user") {
        messageContainer.appendChild(messageText);
        messageContainer.appendChild(document.createTextNode(emojiText));
    } else {
        messageContainer.appendChild(document.createTextNode(emojiText));
        messageContainer.appendChild(messageText);
    }


    // add on to bottom of section
    section.appendChild(messageContainer);

    // scroll to bottom
    section.scrollTo({
        top: section.scrollHeight,
        behavior: "smooth"
    });
}

function sendMessage() {
    // get message from input
    const message = document.getElementById("message-input").value;

    // do nothing if text input doesnt have anything in it
    if (message) {
        // add message from user
        addMessage(message, "user");
        // clear form fields    
        document.getElementById("chat-area").reset();
        // get bot response
        sendBotResponse(message);
    }
}

function sendBotResponse(message) {
    addMessage(getBotResponse(message), "bot");
}
