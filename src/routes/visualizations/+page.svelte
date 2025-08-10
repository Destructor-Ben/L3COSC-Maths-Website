<script>
	import Graph from "$lib/components/Graph.svelte";
	import VisualizationLink from "./VisualizationLink.svelte";
  import { Math } from "svelte-math";
  import * as latex from "$lib/maths/latex";
</script>

<svelte:head>
  <title>Phobos - Visualizations</title>
</svelte:head>

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

  <VisualizationLink title="More Coming Soon" link="/visualizations/">
    TODO
  </VisualizationLink>
</div>

<style>
  .visualization-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 1em;
  }

  :global {
    .visualization-button math {
      font-size: 1.85rem;
    }
  }
</style>