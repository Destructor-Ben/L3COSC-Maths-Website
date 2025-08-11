<script lang="ts">
  import Graph from "$lib/components/Graph.svelte";
  import Title from "$lib/components/Title.svelte";
  import type { DisplayFunction } from "$lib/maths/function";
  import type { Snippet } from "svelte";

  // This is the template page for a visualization
  // This isn't a layout because we need to be able to pass in props

  interface Props {
    title: string; // Used in the page title and heading
    explanation: Snippet; // The explanation section of the page (which is HTML)
    inputs: Snippet; // The input section of the page (which is HTML)
    graphID: string; // The graph id
    functions: DisplayFunction[]; // The functions to be rendered by the visualization
  }

  let { title, explanation, inputs, graphID, functions }: Props = $props();
</script>

<Title title={title} />

<!--
  A container is needed since we want the content to have a gap, but we can't set it on <main>
  without messing with other pages.
 -->
<div class="container">
  <div class="mg heading">
    <h1>{title}</h1>
  </div>

  <div class="mg content">
    <!-- Put the explanation first so people know how to use the viusalization -->
    <h1>Explanation</h1>
    {@render explanation()}

    <hr />

    <h1>Visualization</h1>
    <div class="visualization-inputs">
      {@render inputs()}
    </div>

    <!--
      723x516 instead of 700x500 (same aspect ratio, fits the page better, but not perfectly).
      Less than a pixel of error.
     -->
    <div class="graph-container">
      <Graph
        id={graphID}
        width={723}
        height={516}
        initialScale={{ x: 1 / 10, y: 1 / 10 }}
        hasNiceBorders={true}
        functions={functions}
      />
    </div>
  </div>
</div>

<style>
  .container {
    /* Grow to fill the parent container */
    flex: 1;

    /* Set flex styles, including gap (which can't be set on <main> without messing with other pages) */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
  }

  .heading {
    /* Text being too wide makes it hard to read */
    width: var(--article-width);
  }

  .content {
    /* Text being too wide makes it hard to read */
    width: var(--article-width);
    
    /* Text requires a larger amount of padding to look nice */
    padding: var(--article-padding);
    
    /* Flex styles */
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: 1em;
  }

  /*
    Make the graph centered.
    A container is needed since we can't set a class on the graph directly.
  */
  :global {
    .graph-container canvas {
      align-self: center;
    }
  }

  /*
    Inputs are styled as a grid since it means there the left can easily be labels and the right inputs.
    This does come with the downside that all elements need to be wrapped in a <div>.
    It's worth it since it stops sliders from jittering as you move them, since moving them changes their value,
    which changes their label, which moves the slider, which changes the value, and on and on.
    It also means I don't have to have a hierachy for the inputs, just have the inputs/labels as direct children of
    the inputs list.
  */
  .visualization-inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
    
    /* Needs to affect content outside of this component */
    :global {
      /* Elements on the left (usually labels) */
      & > :nth-child(2n + 1) {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
      }

      /* Elements on the right (usually inputs) */
      & > :nth-child(2n + 2) {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
      }
    }
  }
</style>
