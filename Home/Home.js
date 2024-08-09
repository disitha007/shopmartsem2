const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");
const orderBtn = document.getElementById("orderBtn");

menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


function navigateToOrderPage() {
    window.location.href = "../Orders/Orders.html";
}


orderBtn.addEventListener("click", navigateToOrderPage);