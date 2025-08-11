<script>
  import Title from "$lib/components/Title.svelte";
  import VisualizationLink from "./VisualizationLink.svelte";
  import { Math } from "svelte-math";
  import * as latex from "$lib/maths/latex";
</script>

<Title title="Visualizations" />

<!-- Use a preview of each equation in the list -->
<div class="visualization-list">
  <VisualizationLink title="Taylor Series" link="/visualizations/taylor-series">
    <Math latex={latex.taylorSeries} />
  </VisualizationLink>

  <VisualizationLink title="Newton's Method" link="/visualizations/newtons-method">
    <Math latex={latex.newtonsMethod} />
  </VisualizationLink>

  <VisualizationLink title="Mean Value & Rolle's Theorem" link="/visualizations/mvt-and-rolles-theorem">
    <Math latex={latex.mvtAndRollesTheorem} />
  </VisualizationLink>

  <!-- This is a special card that isn't a link but will use similar styling -->
  <VisualizationLink title="More Coming Soon" link="" isALink={false}>
    <h3>More Coming Soon</h3>
  </VisualizationLink>
</div>

<style>
  .visualization-list {
    /* Make a dynamic css grid with a minimum width of 400px */
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 1em;
  }

  /*
    Change the font size of the math elements.
    Requires a :global selector since they are in different components.
    Need to be careful with :global since once the CSS is added to the HTML document, it never gets removed,
    even after navigating to a different page.
    This might only be a problem in the dev environment, but it's still important to be aware of.
  */
  :global {
    .visualization-button math {
      font-size: 1.85rem;
    }
  }
</style>
