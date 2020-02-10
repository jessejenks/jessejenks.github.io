function initializeCanvas(cv) {
    const pixelRatio = window.devicePixelRatio || 1;
    const rect = cv.getBoundingClientRect();
    cv.width = rect.width * pixelRatio;
    cv.height = rect.height * pixelRatio;

    const ctx = cv.getContext("2d");
    ctx.scale(pixelRatio, pixelRatio);
    return ctx;
}

function arrowTo(ctx, targetX, targetY, { angle=0, size=40, arrowAngle=Math.PI/4, arrowSize=8, padding=0 }={}) {
    const cos = Math.cos(angle);
    const sin = - Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(targetX + cos * (size + padding), targetY + sin * (size + padding));
    ctx.lineTo(targetX + cos * padding, targetY + sin * padding);

    ctx.lineTo(
        targetX + cos * padding + Math.cos(angle + arrowAngle) * arrowSize,
        targetY + sin * padding - Math.sin(angle + arrowAngle) * arrowSize,
    );

    ctx.moveTo(targetX + cos * padding, targetY + sin * padding);
    ctx.lineTo(
        targetX + cos * padding + Math.cos(angle - arrowAngle) * arrowSize,
        targetY + sin * padding - Math.sin(angle - arrowAngle) * arrowSize,
    );

    ctx.stroke();
}

/**
 * A linear interpolator for hexadecimal colors
 * @param {String} a
 * @param {String} b
 * @param {Number} amount
 * @example
 * // returns #7F7F7F
 * lerpColor('#000000', '#ffffff', 0.5)
 * @returns {String}
 */
function lerpColor(a, b, amount) { 
    var ah = +a.replace('#','0x');
        ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
        bh = +b.replace('#','0x');
        br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}

const toHex = x => {
	const hex = Math.round(x).toString(16);
	return hex.length === 1 ? '0' + hex : hex;
}

const hslToHex = (h, s, l) => {
	let r, g, b;

	if (s === 0) {
		r = g = b = l;
	} else {
		const hue2rgb = (p, q, t) => {
			if(t < 0) t += 1;
			if(t > 1) t -= 1;

			if(t < 1/6) return p + (q - p) * 6 * t;
			if(t < 1/2) return q;
			if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
			return p;
		}

		let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		let p = 2 * l - q;
		r = 255*hue2rgb(p, q, h + 1/3);
		g = 255*hue2rgb(p, q, h);
		b = 255*hue2rgb(p, q, h - 1/3);
	}

	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

const choice = a => a[Math.floor(Math.random()*a.length)];

const easeOutQuad = t => t*(2-t);
const easeOutCubic = t => (--t)*t*t+1;

const lerp = (a, b, t) => a + (b-a)*t;

const randomLerp = (a, b) => lerp(a, b, Math.random());

const sinebow = (u, v) => {
    const t = Math.PI*(1 - (( u + 0.5) % 1));
    let r = Math.sin(t);
    let g = Math.sin(t + Math.PI/3);
    let b = Math.sin(t + 2*Math.PI/3);

    // r = 255*(lerp(1,r*r,v));
    r = 255*((1-v) + v*r*r);
    g = 255*((1-v) + v*g*g);
    b = 255*((1-v) + v*b*b);

	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

const fisherYates = n => {
    let arr = Array(n);
    let i;
    for (i = 0; i<n; ++i) arr[i] = i;

    let j, temp;
    for (i = 0; i<n-1; ++i) {
        j = i + Math.floor(Math.random()*(n-i));

        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    return arr;
}