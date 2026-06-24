document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".btn"); // Select all buttons
    buttons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent button default behavior
            fetch("/check-login") // Endpoint to check login status
                .then(response => response.json())
                .then(data => {
                    if (!data.logged_in) {
                        alert("Please register/login first!");
                    } else {
                        window.location.href = button.getAttribute("data-url");
                    }
                });
                
        });
    });
});
