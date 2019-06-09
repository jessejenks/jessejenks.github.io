const animatedCodeContainer = document.querySelector('#animated-code-container');
const animatedCode = document.querySelector('#animated-code');
const animatedChildren = animatedCode.children;

let child, styles;

let scrollPosition = 0;
let lastScrollPosition = 0;
let ticking = false;


const choice = a => a[Math.floor(Math.random()*a.length)];
const permutations = [[2,1,0,3],[3,0,1,2],[3,1,0,2]];
let currentPermutation = choice(permutations);

const isVisible = elt => {
    const { top, bottom } = elt.getBoundingClientRect();
    return (top <= window.innerHeight) && (bottom >= 0);
}

const lowerBound = -30;
const upperBound = 30;
const clamp = x => {
    if (x > upperBound) {
        return lowerBound;
    } else if (x < lowerBound) {
        return upperBound;
    } else {
        return x;
    }
}

const getNewMatrix = (matrix, index, scaleBy) => {
    // gets the y translation
    let value = parseFloat(matrix.split(',')[5]) || 0;
    return `matrix(1,0,0,1,0,${clamp(value - scaleBy*.5*(index+1))})`;
}

const getIdentityMatrix = () => 'matrix(1,0,0,1,0,0)';

const transformPositions = (scrollPosition, isScrollingUP) => {
    const scaleBy = isScrollingUP? -1 : 1;
    for (let i = 0; i<animatedChildren.length; i++) {
        child = animatedChildren[i];
        styles = getComputedStyle(child);

        const noPrefix = styles.getPropertyValue('transform');
        const webkit   = styles.getPropertyValue('-webkit-transform');
        const ms       = styles.getPropertyValue('-ms-transform');

        const args = [currentPermutation[i], scaleBy];

        if (noPrefix && noPrefix !== 'none') {
            
            child.style['transform'] = getNewMatrix(noPrefix, ...args);

        } else if (webkit && webkit !== 'none') {

            child.style['-webkit-transform'] = getNewMatrix(webkit, ...args);

        } else if (ms && ms !== 'none') {

            child.style['-ms-transform'] = getNewMatrix(ms, ...args);

        } else {

            let newMatrix = getIdentityMatrix();
            child.style['transform'] = newMatrix;
            child.style['-webkit-transform'] = newMatrix;
            child.style['-ms-transform'] = newMatrix;

        }
    }
}

let animationDidStart = false;

window.addEventListener('scroll', function(e) {
    
    scrollPosition = window.scrollY || window.pageYOffset;

    if (!ticking && isVisible(animatedCodeContainer)) {
        if (!animationDidStart) {
            animationDidStart = true;
        }
        
        window.requestAnimationFrame(() => {
            transformPositions(
                scrollPosition,
                scrollPosition > lastScrollPosition
            );
            lastScrollPosition = scrollPosition;
            ticking = false;
        });

        ticking = true;
    } else {
        if (animationDidStart) {
            currentPermutation = choice(permutations);
            animationDidStart = false;
        }
    }
});