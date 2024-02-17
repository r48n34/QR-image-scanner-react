const random = (max: number, min: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export function colorCodeToNumber(str: string = "rgb(24, 40, 50)"){ // rgb(24, 40, 50) => [24, 50, 50]
    const [r, g, b] = str.match(/\d+/g)!.map(Number);
    return {r, g, b}
};

export function rgbToHSL(str: string = "rgb(24, 40, 50)"){

    let { r, g, b } = colorCodeToNumber(str);

    r /= 255;
    g /= 255;
    b /= 255;

    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return {
      h: 60 * h < 0 ? 60 * h + 360 : 60 * h,
      l: 100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
      s: (100 * (2 * l - s)) / 2,
    };
};

export function hslObjectToString(data: { h: number, l: number, s: number}): string{
    return `hsl(${data.h.toFixed(0)}, ${data.l.toFixed(0)}%, ${data.s.toFixed(0)}%)`
}

export function monochromeColorList(color: string = "rgb(24, 40, 50)"): string[]{
    let colorArr = [];
    const currentHSL = rgbToHSL(color);

    for(let i = 0 ; i < 5; i ++){
        currentHSL.l -= random(10, 15)
        currentHSL.h -= random(-10, 10)

        const finalHSLStr = hslObjectToString(currentHSL);
        colorArr.push(finalHSLStr);
    }

    return colorArr
} 