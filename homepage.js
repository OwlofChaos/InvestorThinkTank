function postMessage() {
    const messageInput = document.getElementById('message-input');
    const imageInput = document.getElementById('image-input');
    const messageText = messageInput.value.trim();
    const file = imageInput.files[0];

    if (messageText === '' && !file) return;

    // Create new message element
    const newMessage = document.createElement('div');
    newMessage.className = 'message';

    let messageContent = `
        <div class="avatar"></div>
        <div class="text-content">
            <div class="username">Me</div>
    `;

    if (messageText !== '') {
        messageContent += `<div class="message-text">${messageText}</div>`;
        saveMessageToLocalStorage({ username: 'Me', text: messageText });
    }

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            messageContent += `<div class="message-image"><img src="${imageUrl}" alt="Posted Image"></div>`;
            saveMessageToLocalStorage({ username: 'Me', image: imageUrl });
            newMessage.innerHTML = messageContent + `</div>`;
            const messagesContainer = document.getElementById('messages');
            messagesContainer.appendChild(newMessage);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        };
        reader.readAsDataURL(file);
    } else {
        newMessage.innerHTML = messageContent + `</div>`;
        const messagesContainer = document.getElementById('messages');
        messagesContainer.appendChild(newMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Clear input
    messageInput.value = '';
    imageInput.value = '';
}

function saveMessageToLocalStorage(message) {
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    savedMessages.push(message);
    localStorage.setItem('messages', JSON.stringify(savedMessages));
}

function loadMessagesFromLocalStorage() {
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    const messagesContainer = document.getElementById('messages');

    savedMessages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        let messageContent = `
            <div class="avatar"></div>
            <div class="text-content">
                <div class="username">${msg.username}</div>
        `;
        if (msg.text) {
            messageContent += `<div class="message-text">${msg.text}</div>`;
        }
        if (msg.image) {
            messageContent += `<div class="message-image"><img src="${msg.image}" alt="Posted Image"></div>`;
        }
        messageElement.innerHTML = messageContent + `</div>`;
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
