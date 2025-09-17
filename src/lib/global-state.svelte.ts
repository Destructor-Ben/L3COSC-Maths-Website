// This file is for handling shared state between components

// Used to re-render canvases when the colors load
let colorsHaveLoaded = $state(false);

// Return an object with a getter and setter for the state
// Svelte doesn't let state get exported directly
export function getColorsHaveLoaded() {
  return {
    get value() {
      return colorsHaveLoaded;
    },
    set value(value: boolean) {
      colorsHaveLoaded = value;
    },
  };
}
