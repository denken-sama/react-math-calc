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