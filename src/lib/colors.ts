// All of the colours used for canvas rendering are here

import { getColorsHaveLoaded } from "./global-state.svelte";

export let TextColor = "";
export let HeadingColor = "";
export let BackgroundColor = "";
export let MidgroundColor = "";
export let ForegroundColor = "";
export let HighlightColor = "";

export let ContrastRed = "";
export let ContrastGreen = "";
export let ContrastBlue = "";
export let ContrastCyan = "";
export let ContrastMagenta = "";
export let ContrastYellow = "";

const colorsHaveLoaded = getColorsHaveLoaded();

// Sets the JS variables to mirror the CSS variables
// This could be called whenever the colour theme is changed but not really needed
// TODO: 2 problems need fixing
// - Graph needs to re-render when/block first render till colours are set
export function calculateColors()
{
  const styles = window.getComputedStyle(document.body);

  TextColor = styles.getPropertyValue("--col-text");
  HeadingColor = styles.getPropertyValue("--col-heading");
  BackgroundColor = styles.getPropertyValue("--col-bg");
  MidgroundColor = styles.getPropertyValue("--col-mg");
  ForegroundColor = styles.getPropertyValue("--col-fg");
  HighlightColor = styles.getPropertyValue("--col-highlight");

  ContrastRed = styles.getPropertyValue("--col-red");
  ContrastGreen = styles.getPropertyValue("--col-green");
  ContrastBlue = styles.getPropertyValue("--col-blue");
  ContrastCyan = styles.getPropertyValue("--col-cyan");
  ContrastMagenta = styles.getPropertyValue("--col-magenta");
  ContrastYellow = styles.getPropertyValue("--col-yellow");

  colorsHaveLoaded.value = true;
}
