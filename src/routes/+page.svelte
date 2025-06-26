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

<div class="mg title">
  <h1>Name</h1>
  <h2>Maths: Visualized</h2>
  <hr />

  <!-- TODO: Finish the main page-->
</div>

<!-- Background -->
<Graph
  width={width}
  height={height}
  allowsUserInput={false}
  id="background-graph"
/>

<style>
  :global(#background-graph) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .title {
    padding: 3em;
    align-self: center;

    h1 {
      font-size: 5rem;
    }
  }
</style>