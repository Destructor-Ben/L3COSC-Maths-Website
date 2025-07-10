export function lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t;
}

// Use on the t value of lerp, e.g. lerp(a, b, smoothstep(t))
export function smoothstep(t: number): number {
    return (t * t * (3 - 2 * t));
}
