<script lang="ts">
  import Graph from "$lib/components/Graph.svelte";
  import { Math } from "svelte-math";
  import * as Colors from "$lib/colors";
  import { Sin } from "$lib/maths/functions";
  import type { Domain } from "$lib/maths/function";
  import { lerp } from "$lib/maths/lerp";

  let width = $state(0);
  let height = $state(0);

  function handleWindowResize()
  {
    console.log("handleWindowResize")
    width = window.innerWidth;
    height = window.innerHeight;
  }

  // Set initial dimensions
  //$effect(() => {
    //handleWindowResize();
  //});

  // Calculate scroll progress
  //let scrollProgress = $state(0);
</script>

<svelte:head>
  <title>Phobos</title>
</svelte:head>

<svelte:window onresize={handleWindowResize} />

<section>
  <div class="mg title">
    <h1>Phobos</h1>
    <h2>Maths - Visualized</h2>
    <hr />
  </div>
</section>

<section>
  <div class="mg">
    <h2>Open Source</h2>
  </div>
</section>

<section>
  <div class="mg">
    <h2>Knowledge without a pricetag</h2>
  </div>
</section>

<!-- Background -->
<!-- TODO: make the UI look less weird -->
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

  section {
    min-height: 60vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .title {
    padding: 3em;
    align-self: center;

    h1 {
      font-size: 5rem;
    }
  }

  /*functions={[
    {
      name: "background",
      color: () => "red",//Colors.ContrastRed, TODO, doesn't work
      func: Sin,
    }
  ]}*/
</style>