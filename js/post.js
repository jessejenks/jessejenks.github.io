const footnoteLabels = document.querySelectorAll("a[aria-describedby=\"footnote-label\"]");
const referenceLabels = document.querySelectorAll("a[aria-describedby=\"reference-label\"]");
const backLinks = document.querySelectorAll("a[aria-label=\"Back to content\"]");

addClickListeners(footnoteLabels);
addClickListeners(referenceLabels);
addClickListeners(backLinks);

function addClickListeners(anchorNodes) {
    for (let i = 0; i < anchorNodes.length; i++) {
        anchorNodes[i].addEventListener("click", function(e) {
            e.preventDefault();
            window.location.replace(anchorNodes[i].href);
        });
    }
}