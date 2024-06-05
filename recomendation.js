function changeColor(button, category) {
    var buttons = document.querySelectorAll('.btn');
    buttons.forEach(function(btn) {
        btn.classList.remove('active');
    });

    button.classList.add('active');

    var messages = document.querySelectorAll('.message');
    messages.forEach(function(message) {
        if (category === 'all' || message.dataset.category === category) {
            message.style.display = 'flex';
        } else {
            message.style.display = 'none';
        }
    });
}
