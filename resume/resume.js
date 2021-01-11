const animatedCodeContainer = document.querySelector('#animated-code-container');
const animatedCode = document.querySelector('#animated-code');
const animatedChildren = animatedCode.children;

let currentPermutation = getRandomPermutation(animatedChildren.length);

const identityMatrix = "matrix(1,0,0,1,0,0)";

function transformPositions(scrollPosition, isScrollingUP) {
    let child, styles;
    const direction = isScrollingUP ? -1 : 1;
    for (let i = 0; i<animatedChildren.length; i++) {
        child = animatedChildren[i];
        styles = getComputedStyle(child);

        const noPrefix = styles.getPropertyValue('transform');
        const webkit   = styles.getPropertyValue('-webkit-transform');
        const ms       = styles.getPropertyValue('-ms-transform');

        const args = [currentPermutation[i], direction];

        if (noPrefix && noPrefix !== 'none') {
            
            child.style.transform = getNewMatrix(noPrefix, ...args);

        } else if (webkit && webkit !== 'none') {

            child.style['-webkit-transform'] = getNewMatrix(webkit, ...args);

        } else if (ms && ms !== 'none') {

            child.style['-ms-transform'] = getNewMatrix(ms, ...args);

        } else {

            let newMatrix = identityMatrix;
            child.style.transform = newMatrix;
            child.style['-webkit-transform'] = newMatrix;
            child.style['-ms-transform'] = newMatrix;

        }
    }
}

function getNewMatrix(matrix, index, direction) {
    // gets the y translation
    let value = parseFloat(matrix.split(',')[5]) || 0;
    return `matrix(1,0,0,1,0,${clamp(value - direction * (index+1) / 4)})`;
}

const lowerBound = -30;
const upperBound = 30;
function clamp(x) {
    if (x > upperBound) {
        return lowerBound;
    } else if (x < lowerBound) {
        return upperBound;
    } else {
        return x;
    }
}


let animationDidStart = false;

let scrollPosition = 0;
let lastScrollPosition = 0;
let ticking = false;

window.addEventListener('scroll', function(e) {
    scrollPosition = window.scrollY || window.pageYOffset;

    if (!ticking && isVisible(animatedCodeContainer)) {
        if (!animationDidStart) {
            animationDidStart = true;
        }
        
        window.requestAnimationFrame(() => {
            transformPositions(scrollPosition, scrollPosition > lastScrollPosition);
            lastScrollPosition = scrollPosition;
            ticking = false;
        });

        ticking = true;
    } else {
        if (animationDidStart) {
            currentPermutation = getRandomPermutation(animatedChildren.length);
            animationDidStart = false;
        }
    }
});

function isVisible(elt) {
    const { top, bottom } = elt.getBoundingClientRect();
    return (top <= window.innerHeight) && (bottom >= 0);
}

function getRandomPermutation(n=0) {
    return fisherYates([...Array(n).keys()]);
}

function fisherYates(arr=[]) {
    const n = arr.length;
    let j;
    let temp;
    for (let i = 0; i < n - 1; i++) {
        j = Math.round(Math.random() * i);
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    return arr;
}