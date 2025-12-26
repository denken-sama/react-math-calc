export const add = (x: number, y: number): number => x + y;
export const subtract = (x: number, y: number): number => x - y;
export const multiply = (x: number, y: number): number => x * y;
export const divide = (x: number, y: number): number | string => {
  if (y !== 0) {
    return x / y;
  } else {
    return "Error: Cannot divide by zero!";
  }
};