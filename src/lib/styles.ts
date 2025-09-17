// All of the styles used for canvas rendering are here
// They are retrieved from the CSS when the page loads
// If light/dark mode is changed, the page will need a reload for
// the styles to be updated in JavaScript

import { getColorsHaveLoaded } from "./global-state.svelte";

export let TextColor = "";
export let HeadingColor = "";

export let BackgroundColor = "";
export let MidgroundColor = "";
export let ForegroundColor = "";

export let HoverColor = "";
export let HighlightColor = "";
export let BorderColor = "";

export let ContrastRed = "";
export let ContrastGreen = "";
export let ContrastBlue = "";

const colorsHaveLoaded = getColorsHaveLoaded();

// Sets the JS variables to mirror the CSS variables
// This could be called whenever the colour theme is changed but not really needed
export function calculateStyles()
{
  const styles = window.getComputedStyle(document.body);

  TextColor = styles.getPropertyValue("--col-text");
  HeadingColor = styles.getPropertyValue("--col-heading");

  BackgroundColor = styles.getPropertyValue("--col-bg");
  MidgroundColor = styles.getPropertyValue("--col-mg");
  ForegroundColor = styles.getPropertyValue("--col-fg");

  HoverColor = styles.getPropertyValue("--col-hover");
  HighlightColor = styles.getPropertyValue("--col-highlight");
  BorderColor = styles.getPropertyValue("--col-border");

  ContrastRed = styles.getPropertyValue("--col-red");
  ContrastGreen = styles.getPropertyValue("--col-green");
  ContrastBlue = styles.getPropertyValue("--col-blue");

  // Setting this will update the rest of the website because it is reactive state
  colorsHaveLoaded.value = true;
}
