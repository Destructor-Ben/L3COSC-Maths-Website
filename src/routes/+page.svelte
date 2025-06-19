<script>
	import Graph from "$lib/components/Graph.svelte";
  import { Math } from "svelte-math";

  let width = $state(0);
  let height = $state(0);

  function handleWindowResize()
  {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  // Set initial dimensions
  $effect(() => {
    handleWindowResize();
  });
</script>

<svelte:window onresize={handleWindowResize} />

<h1>TODO: name</h1>
<h2>Maths: Visualized</h2>

<a href="/visualizations">See Visualizations</a>

<div>
<button class="button">Test</button>
</div>

<div>
  <Math>ax^2 + bx + c</Math>
  <br/>
  <Math>Θ ϴ θ ϑ</Math>
  <br/>
  <Math>{"i\\sin{θ}"}</Math>
</div>

<p>
  Uppercase:
  Θ
  ϴ
  <br/>
  Lowercase:
  θ
  ϑ
  <br />
</p>

<!-- Background 
<Graph
  width={width}
  height={height}
  allowsUserInput={false}
  id="background-graph"
/>-->

<style>
  :global(#background-graph) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }
</style>