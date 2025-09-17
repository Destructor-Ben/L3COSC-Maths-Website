// This file contains a list of Function(s) that can be reused

import type { Function } from "./function";

export const Empty = (x: number) => 0;

export function getEmptyDerivative(n: number) {
  return Empty;
}

export const Sin: Function = (x: number) => Math.sin(x);
export const Cos: Function = (x: number) => Math.cos(x);
export const Exp: Function = (x: number) => Math.exp(x);

// Keep in mind the 0th derivative is the function itself
export function getSinDerivative(n: number): Function {
  switch (n % 4) {
    case 0:
      return (x: number) => Math.sin(x);
    case 1:
      return (x: number) => Math.cos(x);
    case 2:
      return (x: number) => -Math.sin(x);
    case 3:
      return (x: number) => -Math.cos(x);
  }

  return Empty; // This should never happen
}

// Cos follows the same pattern as sin
export function getCosDerivative(n: number): Function {
  return getSinDerivative(n + 1);
}

// e^x derivative is itself
export function getExpDerivative(n: number): Function {
  return Exp;
}
