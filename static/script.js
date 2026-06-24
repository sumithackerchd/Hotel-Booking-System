
// FAQ Dropdown Functionality
    document.querySelectorAll(".faq-question").forEach(item => {
        item.addEventListener("click", () => {
            let parent = item.parentNode;
            parent.classList.toggle("active");
        });
    });

function test(){
console.log("new code")
}
   
    
    

