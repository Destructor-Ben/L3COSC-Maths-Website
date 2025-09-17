import type { Function } from "./function";

export function factorial(n: number): number {
  if (n <= 1)
    return 1;

  return n * factorial(n - 1);
}

// We use getDerivative instead of passing in derivatives directly because
// it's easier to calculate derivatives for any iteration count
// Especially because sin and cos have a repeating pattern and don't need a
// hardcoded list of derivatives
export function taylor(x: number, a: number, iterations: number, getDerivative: (n: number) => Function): number {
  let sum = 0;

  for (let n = 0; n <= iterations; n++) {
    sum += getDerivative(n)(a) / factorial(n) * Math.pow(x - a, n);
  }

  return sum;
};
