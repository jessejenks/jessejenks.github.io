const accordions = document.querySelectorAll(".accordion");

for (let i = 0; i<accordions.length; i++) {
    accordions[i].onclick = function() {
        this.classList.toggle("active");
        if (this.nextElementSibling) {
            this.nextElementSibling.classList.toggle("show");
        }
    }
}