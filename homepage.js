function postMessage() {
    const messageInput = document.getElementById('message-input');
    const imageInput = document.getElementById('image-input');
    const messageText = messageInput.value.trim();
    const imageFile = imageInput.files[0];

    if (messageText === '' && !imageFile) return;

    const reader = new FileReader();
    reader.onloadend = function() {
        const imageDataUrl = imageFile ? reader.result : null;

        const newMessage = {
            username: 'Me',
            text: messageText,
            image: imageDataUrl,
            id: Date.now()  // Unique ID for each message
        };

        // Save message to local storage
        saveMessageToLocalStorage(newMessage);

        // Clear input fields
        messageInput.value = '';
        imageInput.value = '';

        // Add new message to messages container
        addMessageToContainer(newMessage);
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else {
        reader.onloadend();
    }
}

function saveMessageToLocalStorage(message) {
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    savedMessages.push(message);
    localStorage.setItem('messages', JSON.stringify(savedMessages));
}

function addMessageToContainer(message) {
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.dataset.id = message.id;  // Set a unique ID as a data attribute
    let messageContent = `
        <div class="avatar"></div>
        <div class="text-content">
            <div class="username">${message.username}</div>
    `;
    if (message.text) {
        messageContent += `<div class="message-text">${message.text}</div>`;
    }
    if (message.image) {
        messageContent += `<div class="message-image"><img src="${message.image}" alt="Posted Image"></div>`;
    }
    messageElement.innerHTML = messageContent + `</div>`;
    messagesContainer.appendChild(messageElement);

    // Scroll to the bottom of the messages container
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function loadMessagesFromLocalStorage() {
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    savedMessages.forEach(addMessageToContainer);
}

function clearMessages() {
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    const remainingMessages = savedMessages.filter(msg => msg.username !== 'Me');

    localStorage.setItem('messages', JSON.stringify(remainingMessages));

    const messagesContainer = document.getElementById('messages');
    const messages = Array.from(messagesContainer.children);

    messages.forEach(message => {
        if (message.querySelector('.username').textContent === 'Me') {
            messagesContainer.removeChild(message);
        }
    });
}

document.addEventListener('DOMContentLoaded', loadMessagesFromLocalStorage);
