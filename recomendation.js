function filterPosts(category) {
    var buttons = document.querySelectorAll('.btn');
    buttons.forEach(function(btn) {
        btn.classList.remove('active');
    });

    var activeButton = document.querySelector(`.btn[onclick="filterPosts('${category}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }

    var messages = document.querySelectorAll('.message');
    messages.forEach(function(message) {
        if (category === 'all' || message.dataset.category === category) {
            message.style.display = 'flex';
        } else {
            message.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    filterPosts('all'); // Show all posts by default
});
