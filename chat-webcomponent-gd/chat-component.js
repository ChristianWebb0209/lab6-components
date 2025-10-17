import { getBotResponse } from "../eliza.js";

class ChatInterface extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                :host {
                    display: block;
                    font-family: Arial, sans-serif;
                    background-color: #696BCD;
                    display: flex;
                    justify-content: center;

                    /* confused by styling error, this is a half fix but theres still white margins around the sides */
                    min-height: 100vh;
                    align-items: center;
                }

                .main-container {
                    border-radius: 8px;
                    width: 100%;
                    max-width: 40rem;
                    height: 30rem;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                .chat-header {
                    text-align: center;
                    background-color: #6699ff;
                    color: white;
                    padding: 20px;
                }

                .chat-header h1 {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }

                .chat-container {
                    flex: 1;
                    padding: 20px;
                    overflow-y: scroll;
                    background-color: white;
                }

                .bot-message {
                    display: flex;
                    align-items: flex-start;
                    row-gap: 10px;
                    margin-bottom: 15px;
                }

                .user-message {
                    display: flex;
                    align-items: flex-start;
                    row-gap: 10px;
                    margin-bottom: 15px;
                    justify-content: flex-end;
                }

                .bot-message .message-text {
                    padding: 12px 16px;
                    border-radius: 18px;
                    max-width: 70%;
                    background-color: #f0f0f0;
                    color: #3f3f3f;
                }

                .user-message .message-text {
                    padding: 12px 16px;
                    border-radius: 18px;
                    max-width: 70%;
                    background-color: #6699ff;
                    color: white;
                }

                .chat-area {
                    display: flex;
                    padding: 20px;
                    gap: 10px;
                    background-color: white;
                    border-top: 1px solid #e2e2e2;
                }

                .message-input {
                    flex: 1;
                    padding: 12px 16px;
                    border: 1px solid #e2e2e2;
                    border-radius: 20px;
                    font-size: 16px;
                    outline: none;
                }

                .send-button {
                    padding: 12px 16px;
                    color: #3f3f3f;
                    background-color: #c0c0c0;
                    border: none;
                    border-radius: 20px;
                    cursor: pointer;
                }
            </style>

            <main class="main-container">
                <header class="chat-header">
                    <h1>Chat Assistant</h1>
                    <p>Shadow DOM Only Component!</p>
                </header>

                <section class="chat-container" id="chat-container"></section>

                <form class="chat-area" id="chat-area">
                    <input type="text" placeholder="Type your message..." class="message-input" id="message-input">
                    <button type="button" class="send-button" id="send-button">Send</button>
                </form>
            </main>
        `;

        this.setupEventListeners();
    }

    // most of the code from here is just the same as from progressive enhancement approach and modified slightly??

    setupEventListeners() {
        // elements from shadow dom
        this.chatContainer = this.shadowRoot.getElementById('chat-container');
        this.chatArea = this.shadowRoot.getElementById('chat-area');
        this.messageInput = this.shadowRoot.getElementById('message-input');
        this.sendButton = this.shadowRoot.getElementById('send-button');

        this.sendButton.addEventListener('click', () => {
            const message = this.messageInput.value.trim();
            if (message) {
                this.addMessage(message, 'user');
                this.chatArea.reset();

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

        // same logic from other approaches
        const emoji = user == 'user' ? '🧑' : '👽';
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = message;

        if (user === 'user') {
            messageContainer.appendChild(messageText);
            messageContainer.appendChild(document.createTextNode(emoji));
        } else {
            messageContainer.appendChild(document.createTextNode(emoji));
            messageContainer.appendChild(messageText);
        }

        this.chatContainer.appendChild(messageContainer);

        this.chatContainer.scrollTo({
            top: this.chatContainer.scrollHeight,
            behavior: 'smooth'
        });
    }
}

customElements.define('chat-interface', ChatInterface);
