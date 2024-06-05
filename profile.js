document.addEventListener("DOMContentLoaded", () => {
    const editButtons = document.querySelectorAll(".edit-btn");

    const saveContent = (id, content) => {
        localStorage.setItem(id, content);
    };

    const toggleEditing = (button, field) => {
        const isEditable = field.getAttribute("contenteditable") === "true";
        if (isEditable) {
            saveContent(field.id, field.textContent);
            field.setAttribute("contenteditable", "false");
            button.textContent = "Edit";
        } else {
            field.setAttribute("contenteditable", "true");
            field.focus();
            button.textContent = "Save";
        }
    };

    editButtons.forEach(button => {
        const field = button.previousElementSibling;
        button.addEventListener("click", () => toggleEditing(button, field));
    });

    document.querySelectorAll(".editable").forEach(field => {
        const savedContent = localStorage.getItem(field.id);
        if (savedContent) {
            field.textContent = savedContent;
        }
    });
});
