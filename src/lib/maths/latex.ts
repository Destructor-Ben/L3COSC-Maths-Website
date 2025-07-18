// A bunch of latex notation for various visualizations

import * as Colors from "$lib/colors";

// TODO: add colors
const test = `\\color{${Colors.ContrastRed}}`;

export const taylorSeries = `f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x - a)^n`;
export const newtonsMethod = "x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}";
export const mvtAndRollesTheorem = "f'(c) = \\frac{f(b) - f(a)}{b - a} \\\\ \\text{for some } c \\in (a, b)";
export const fundamentalsOfCalculus = "F(x) = \\int f(x) \\, dx = F(b) - F(a) \\\\ \\text{where } F'(x) = f(x)";
