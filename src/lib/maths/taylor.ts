import type { Function } from "./function";

export function factorial(n: number): number {
  if (n <= 1)
    return 1;

  return n * factorial(n - 1);
}

export function taylor(x: number, a: number, iterations: number, getDerivative: (n: number) => Function): number {
  let sum = 0;

  for (let n = 0; n <= iterations; n++) {
    sum += getDerivative(n)(a) / factorial(n) * Math.pow(x - a, n);
  }

  return sum;
};
