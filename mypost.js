document.addEventListener('DOMContentLoaded', loadMyPostsFromLocalStorage);

function loadMyPostsFromLocalStorage() {
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    const myPostsContainer = document.getElementById('my-posts');

    savedMessages.forEach(msg => {
        if (msg.username === 'Me') {
            const messageElement = document.createElement('div');
            messageElement.className = 'message user';
            messageElement.innerHTML = `
                <div class="avatar"></div>
                <div class="text-content">
                    <div class="username">Me</div>
                    <div class="message-text">${msg.text}</div>
                </div>
            `;
            myPostsContainer.appendChild(messageElement);
        }
    });
}
