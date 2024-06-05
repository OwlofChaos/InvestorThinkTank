document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    // Check login credentials, you may want to check against stored data or a backend
    // For now, just for demonstration purposes, let's assume the user "admin" with password "admin" can login
    if (username === "admin" && password === "admin") {
        // Redirect to profile page
        window.location.href = "profile.html";
    } else {
        alert("Invalid username or password");
    }
});
