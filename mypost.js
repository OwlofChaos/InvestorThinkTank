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

    document.addEventListener('DOMContentLoaded', loadMessagesFromLocalStorage);
