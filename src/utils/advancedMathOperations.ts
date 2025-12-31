export const percentage = (x: number, y?: number): number => y !== undefined && !isNaN(y) ? (x / 100) * y : x / 100;

export const squareRoot = (x: number): number | string => x >= 0 ? Math.sqrt(x) : 'Error: Negative number';

export const sin = (x: number): number => Math.sin(x * Math.PI / 180); // Assuming input in degrees

export const factorial = (x: number): number | string => {
  if (x < 0 || !Number.isInteger(x)) {
    return 'Error: Factorial is only defined for non-negative integers';
  }
  if (x === 0) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= x; i++) {
    result *= i;
  }
  return result;
};

export const power = (x: number, y: number): number => Math.pow(x, y);

export const round = (x: number): number => Math.round(x);
export const floor = (x: number): number => Math.floor(x);
export const ceil = (x: number): number => Math.ceil(x);

export const cos = (x: number): number => Math.cos(x * Math.PI / 180); // Assuming input in degrees
export const tan = (x: number): number | string => {
  const angleInRadians = x * Math.PI / 180;
  // Check for angles where tan is undefined (e.g., 90, 270 degrees)
  if (Math.abs(Math.cos(angleInRadians)) < 1e-10) {
    return "Error: Tan undefined";
  }
  return Math.tan(angleInRadians);
};

export const reciprocal = (x: number): number | string => {
  if (x === 0) {
    return "Error: Cannot find reciprocal of zero!";
  } else {
    return 1 / x;
  }
};

export const log = (x: number): number | string => {
  if (x <= 0) {
    return 'Error: Logarithm is only defined for positive numbers';
  }
  return Math.log(x); // Natural logarithm (base e)
};

export const log10 = (x: number): number | string => {
  if (x <= 0) {
    return 'Error: Logarithm is only defined for positive numbers';
  }
  return Math.log10(x); // Base 10 logarithm
};

export const exponential = (x: number): number => Math.exp(x);

export const degToRad = (deg: number): number => deg * (Math.PI / 180);

export const radToDeg = (rad: number): number => rad * (180 / Math.PI);