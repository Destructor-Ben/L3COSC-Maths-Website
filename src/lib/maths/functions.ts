import type { Domain, DisplayFunction, Function } from "./function";
import * as Colors from "../colors";

// Contains a list of functions that can be reused

export const Empty = (x: number) => 0;
export const EmptyDisplayFunction: DisplayFunction = {
  name: "empty",
  color: Colors.LightColor,
  func: Empty,
};

export function getEmptyDerivative(n: number) {
  return Empty;
}

export const Sin = (x: number) => Math.sin(x);
export const Cos = (x: number) => Math.cos(x);
export const Tan = (x: number) => Math.tan(x);
export const Exp = (x: number) => Math.exp(x);

export function getSinDerivative(n: number) {
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

export function getCosDerivative(n: number) {
  return getSinDerivative(n + 1);
}

export function getTanDomains(a: number, b: number) {
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
