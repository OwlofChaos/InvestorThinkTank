function postMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();

    if (messageText === '') return;

    const newMessage = document.createElement('div');
    newMessage.className = 'message';
    newMessage.innerHTML = `
        <div class="avatar"></div>
        <div class="text-content">
            <div class="username">Me</div>
            <div class="message-text">${messageText}</div>
        </div>
    `;

    const chatContainer = document.getElementById('chat-container');
    chatContainer.appendChild(newMessage);

    saveMessageToLocalStorage(messageText);

    messageInput.value = '';
}

function saveMessageToLocalStorage(message) {
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    savedMessages.push({ username: 'Me', text: message });
    localStorage.setItem('messages', JSON.stringify(savedMessages));
}

function loadMessagesFromLocalStorage() {
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    const chatContainer = document.getElementById('chat-container');

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
        chatContainer.appendChild(messageElement);
    });
}

document.addEventListener('DOMContentLoaded', loadMessagesFromLocalStorage);
