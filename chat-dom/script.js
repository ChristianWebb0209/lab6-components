

function addMessage(message, user){
    // get from DOM section of messages
    
    // createElement and append
    
    // scroll to bottom

}

function sendMessage() {
    // get message from input
    const message = document.getElementById("message-input");
    // add message from user
    addMessage(message, "user");
    // clear form fields    
    document.getElementById("chat-area").reset();
    // get bot response
    sendBotResponse(message);
}

function sendBotResponse(message){
    addMessage(getElizaResopnse(message), "bot");
}


function __init() {
    // add event listener for input button
    document.getElementById("send-button").addEventListener(onclick, sendMessage)

}

function getElizaResopnse (message) {

}