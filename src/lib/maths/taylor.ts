import type { Func } from "./function";

export function factorial(n: number): number {
  if (n <= 1)
    return 1;

  return n * factorial(n - 1);
}

export function taylor(x: number, a: number, iterations: number, functions: Func[]): number {
  let sum = 0;

  for (let n = 0; n <= iterations; n++) {
    sum += functions[n](a) / factorial(n) * Math.pow(x - a, n);
  }

  return sum;
};
