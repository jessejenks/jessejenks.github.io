const backLinks = document.querySelectorAll("a[aria-label=\"Back to content\"]");

addClickListeners(backLinks);

function addClickListeners(anchorNodes) {
    for (let i = 0; i < anchorNodes.length; i++) {
        anchorNodes[i].addEventListener("click", function(e) {
            e.preventDefault();
            window.location.replace(anchorNodes[i].href);
        });
    }
}

const showHideButtons = document.querySelectorAll(".show-hide-button");

for (let i = 0; i < showHideButtons.length; i++) {
    showHideButtons[i].addEventListener("click", function() {
        showHideButtons[i].classList.toggle("active");
        if (showHideButtons[i].nextElementSibling) {
            showHideButtons[i].nextElementSibling.classList.toggle("show");
        }
    });
}