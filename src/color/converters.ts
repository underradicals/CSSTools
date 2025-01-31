type Color = {
  to_hex: () => string;
  to_rgb: () => string;
  red: string;
  green: string;
  blue: string;
  alpha: string;
}

export function fromRgbToHex(r: number, g: number, b: number, alpha: number = 1): Color {
  let R: string, G: string, B: string, A: string = '';

  if (r > 255 || g > 255 || b > 255) {
    throw `Invalid color value: You entered a value greater than 255`;
  }

  if (r < 0 || g < 0 || b < 0) {
    throw `Invalid color value: You entered a value less than 0`;
  }

  if (alpha < 0) {
    throw `Invalid alpha value: You entered an alpha value less than 0`;
  }

  if (alpha > 255) {
    throw `Invalid alpha value: You entered an alpha value greater than 255`;
  }

  if (alpha < 1) {
    A = (Math.round(alpha * 255)).toString(16);
  } else if (alpha > 1 && alpha <= 255) {
    A = alpha.toString(16)
  }

  if (g === 0) {
    G = '00';
  } else {
    G = g.toString(16);
  }

  if (b === 0) {
    B = '00';
  } else {
    B = b.toString(16);
  }

  if (r === 0) {
    R = '00';
  } else {
    R = r.toString(16);
  }
  return {
    to_hex() { return [`#${R}${G}${B}${A}`, `#${R}${G}${B}`][+(alpha === 1)] },
    to_rgb() { return [`rgb(${r}, ${g}, ${b} / ${alpha})`, `rgb(${r}, ${g}, ${b})`][+(alpha === 1)] },
    red: R,
    green: G,
    blue: B,
    alpha: A
  };
}

export function fromHexToRgb(hexValue: string | number): Color {
  let R: string, G: string, B: string, A: string = '';
  let hexString = '';
  let alpha = 1;
  const regex1 = /^#?[0-9a-f]{3,}/g;
  const regex2 = /^#?/g;

  if (typeof (hexValue) === 'number') {
    hexString = hexValue.toString(16);
  }

  if (typeof (hexString) === 'string' && !regex1.test(hexString)) {
    throw 'Invalid Hex Value';
  }

  if (typeof (hexValue) === 'string' && regex2.test(hexValue)) {
    hexString = hexValue.substring(1, hexValue.length);
  }



  if (hexString.length === 3) {
    let rr = hexString[0];
    let gg = hexString[1];
    let bb = hexString[2];

    R = parseInt(`${rr}${rr}`, 16).toString();
    G = parseInt(`${gg}${gg}`, 16).toString();
    B = parseInt(`${bb}${bb}`, 16).toString();
  } else if (hexString.length === 4) {
    let rr = hexString[0];
    let gg = hexString[1];
    let bb = hexString[2];
    let aa = hexString[3];

    R = parseInt(`${rr}${rr}`, 16).toString();
    G = parseInt(`${gg}${gg}`, 16).toString();
    B = parseInt(`${bb}${bb}`, 16).toString();
    A = parseInt(`${aa}${aa}`, 16).toString();

    // A = ((alpha / 255)).toFixed(2)

  } else if (hexString.length === 6) {
    R = parseInt(`${hexString[0]}${hexString[1]}`, 16).toString();
    G = parseInt(`${hexString[2]}${hexString[3]}`, 16).toString();
    B = parseInt(`${hexString[4]}${hexString[5]}`, 16).toString();

  } else if (hexString.length === 8) {
    R = parseInt(`${hexString[0]}${hexString[1]}`, 16).toString();
    G = parseInt(`${hexString[2]}${hexString[3]}`, 16).toString();
    B = parseInt(`${hexString[4]}${hexString[5]}`, 16).toString();
    A = parseInt(`${hexString[6]}${hexString[7]}`, 16).toString();
  } else {
    throw `You have entered an invalid hex value: Acceptable lengths are 3, 4, 6 or 8`
  }

  return {
    to_hex() { return [`#${R}${G}${B}${A}`, `#${R}${G}${B}`][+(alpha === 1)] },
    to_rgb() { return [`rgb(${R}, ${G}, ${B} / ${A})`, `rgb(${R}, ${G}, ${B})`][+(alpha === 1)] },
    red: R,
    green: G,
    blue: B,
    alpha: A
  };
}