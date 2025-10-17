import { getBotResponse } from "../eliza.js";

class SimpleChat extends HTMLElement {

    connectedCallback() {
        // find already existing markup from html
        this.chatContainer = this.querySelector('.chat-container');
        this.chatArea = this.querySelector('.chat-area');
        this.messageInput = this.querySelector('.message-input');
        this.sendButton = this.querySelector('.send-button');

        this.sendButton.addEventListener('click', () => {
            const message = this.messageInput.value;
            if (message) {

                this.addMessage(message, 'user');
                if (this.chatArea) {
                    this.chatArea.reset();
                }

                this.addMessage(getBotResponse(message), 'bot');
            }
        });


        // pressing enter is the same as clicking submit
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.sendButton.click();
            }
        });
    }

    addMessage(message, user) {
        const messageContainer = document.createElement('div');
        messageContainer.className = user == 'user' ? 'user-message' : 'bot-message';

        const emoji = user == 'user' ? '🧑' : '👽';

        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = message;

        // same order logic from dom approach
        if (user === 'user') {
            messageContainer.appendChild(messageText);
            messageContainer.appendChild(document.createTextNode(emoji));
        } else {
            messageContainer.appendChild(document.createTextNode(emoji));
            messageContainer.appendChild(messageText);
        }

        this.chatContainer.appendChild(messageContainer);

        // scroll after each message
        this.chatContainer.scrollTo({ top: this.chatContainer.scrollHeight, behavior: 'smooth' });
    }
}

customElements.define('simple-chat', SimpleChat);

