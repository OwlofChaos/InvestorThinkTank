function changeColor(button) {
    var buttons = document.querySelectorAll('.btn');
    buttons.forEach(function(btn) {
        btn.classList.remove('active');
    });

    button.classList.add('active');
}
