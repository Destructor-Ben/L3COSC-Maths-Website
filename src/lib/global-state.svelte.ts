// Used to re-render canvases when the colors load
let colorsHaveLoaded = $state(false);

export function getColorsHaveLoaded()
{
  return {
    get value() {
      return colorsHaveLoaded;
    },
    set value(value: boolean) {
      colorsHaveLoaded = value;
    }
  };
}
