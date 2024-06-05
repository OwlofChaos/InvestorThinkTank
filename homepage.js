// main.js

function postMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();

    if (messageText === '') return;

    // Create new message element
    const newMessage = document.createElement('div');
    newMessage.className = 'message';
    newMessage.innerHTML = `
        <div class="avatar"></div>
        <div class="text-content">
            <div class="username">Me</div>
            <div class="message-text">${messageText}</div>
        </div>
    `;

    // Add new message to messages container
    const messagesContainer = document.getElementById('messages');
    messagesContainer.appendChild(newMessage);

    // Save message to local storage
    saveMessageToLocalStorage(messageText);

    // Clear input
    messageInput.value = '';

    // Scroll to the bottom of the messages container
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function saveMessageToLocalStorage(message) {
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    savedMessages.push({ username: 'Me', text: message });
    localStorage.setItem('messages', JSON.stringify(savedMessages));
}

function loadMessagesFromLocalStorage() {
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    const messagesContainer = document.getElementById('messages');

    savedMessages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `
            <div class="avatar"></div>
            <div class="text-content">
                <div class="username">${msg.username}</div>
                <div class="message-text">${msg.text}</div>
            </div>
        `;
        messagesContainer.appendChild(messageElement);
    });

    // Scroll to the bottom of the messages container
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function clearMessages() {
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    const messagesContainer = document.getElementById('messages');
    const messages = Array.from(messagesContainer.children);

    const filteredMessages = savedMessages.filter(msg => msg.username !== 'Me');
    localStorage.setItem('messages', JSON.stringify(filteredMessages));

    messages.forEach(message => {
        if (message.querySelector('.username').textContent === 'Me') {
            messagesContainer.removeChild(message);
        }
    });
}

document.addEventListener('DOMContentLoaded', loadMessagesFromLocalStorage);
