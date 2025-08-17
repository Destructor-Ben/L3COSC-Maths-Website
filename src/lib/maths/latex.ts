// A bunch of latex notation for various visualizations

import * as Styles from "$lib/styles";

// TODO: add colors
const test = `\\color{${Styles.ContrastRed}}`;

export const taylorSeries = `f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x - a)^n`;
export const newtonsMethod = "x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}";
export const mvtAndRollesTheorem = "f'(c) = \\frac{f(b) - f(a)}{b - a}";
export const mvtAndRollesTheoremPart2 = "\\text{where } c \\in (a, b)";
