// Linearly interpolates between start and end based on t
export function lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t;
}

// Smooths the input t value
// Use on the t value of lerp to smooth animations, e.g. lerp(a, b, smoothstep(t))
export function smoothstep(t: number): number {
    return (t * t * (3 - 2 * t));
}
