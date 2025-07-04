import type { Domain, Function } from "./function";

// Contains a list of functions that can be reused

export const Empty = (x: number) => 0;

export function getEmptyDerivative(n: number) {
  return Empty;
}

export const Sin: Function = (x: number) => Math.sin(x);
export const Cos: Function = (x: number) => Math.cos(x);
export const Tan: Function = (x: number) => Math.tan(x);
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

export function getCosDerivative(n: number): Function {
  return getSinDerivative(n + 1);
}

function secSqr(x: number) {
  return 1 / Math.cos(x) / Math.cos(x);
}

// TODO: finish implementing
export function getTanDerivative(n: number): Function {
  // Tan doesn't have easy to calculate derivatives so its hardcoded
  if (n === 0)
    return Tan;
  if (n === 1)
    return (x: number) => secSqr(x)
  else if (n === 2)
    return (x: number) => 2 * Math.tan(x) * secSqr(x);
  else if (n === 3)
    return (x: number) => 2 * Math.tan(x) * (1 + Math.pow(Math.tan(x), 2)) * secSqr(x);
  else if (n === 4)
    return (x: number) => 2 * Math.tan(x) * (1 + 3 * Math.pow(Math.tan(x), 2)) * secSqr(x);

  return Empty;
}

export function getExpDerivative(n: number): Function {
  return Exp;
}

export function getTanDomains(a: number, b: number): Domain[] {
  const domains = [];

  // This seems to still have issues but it mostly works
  // TODO: investigate if the issues are with this function or the rendering
  // TODO: domains pop in
  const minValue = Math.ceil(a / Math.PI);
  const maxValue = Math.floor(b / Math.PI);

  for (let i = minValue; i <= maxValue; i++) {
    const start = i * Math.PI - Math.PI / 2;
    const end = i * Math.PI + Math.PI / 2;

    domains.push({
      start: start,
      end: end,
      includeStart: false,
      includeEnd: false,
    });
  }

  return domains;
}
