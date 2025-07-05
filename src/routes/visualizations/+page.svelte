<script>
	import Graph from "$lib/components/Graph.svelte";
	import VisualizationLink from "./VisualizationLink.svelte";

</script>
<div class="visualization-list">
  TODO: we need an OnResize callback and OnHover callback
  <VisualizationLink title="Taylor Series" link="/visualizations/taylor-series">
    TODO: make the preview look like an animated taylor series on hover
    <Graph
      id="taylor-series"
      width={800}
      height={400}
    />
  </VisualizationLink>

  <VisualizationLink title="Newton's Method" link="/visualizations/newtons-method">
    TODO: make the preview look like an animated newtons method
  </VisualizationLink>

  <VisualizationLink title="Mean Value & Rolle's Theorem" link="/visualizations/mvt-and-rolles-theorem">
    TODO: make the preview look like an animated MVT visual
  </VisualizationLink>

  <!-- Below are temporary and are for testing -->
  <VisualizationLink title="Taylor Series" link="/visualizations/taylor-series">
    Test
  </VisualizationLink>

  <VisualizationLink title="Taylor Series" link="/visualizations/taylor-series">
    Test
  </VisualizationLink>

  <VisualizationLink title="Taylor Series" link="/visualizations/taylor-series">
    Test
  </VisualizationLink>

  <VisualizationLink title="Taylor Series" link="/visualizations/taylor-series">
    Test
  </VisualizationLink>

  <VisualizationLink title="Taylor Series" link="/visualizations/taylor-series">
    Test
  </VisualizationLink>
</div>

<style>
  .visualization-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 1em;
  }
</style>