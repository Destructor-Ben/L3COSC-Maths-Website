import type { Domain, Function } from "./function";
import * as Colors from "../colors";

// Contains a list of functions that can be reused

export const Sin = { name: "sin(x)", color: Colors.ContrastRed,   func: (x: number) => Math.sin(x) };
export const Cos = { name: "cos(x)", color: Colors.ContrastBlue,  func: (x: number) => Math.cos(x) };
export const Tan = {
  name: "tan(x)",
  color: Colors.ContrastGreen,
  func: (x: number) => Math.tan(x),
  getDomain: (a: number, b: number) => {
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
};

export const Exp = { name: "e^x", color: Colors.ContrastMagenta,  func: (x: number) => Math.exp(x) };
