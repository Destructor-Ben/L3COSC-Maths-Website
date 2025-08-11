<script lang="ts">
  import Title from "$lib/components/Title.svelte";
  import type { Snippet } from "svelte";

  // This is the template page for a visualization
  // This isn't a layout because we need to be able to pass in props

  interface Props {
    title: string; // Used in the page title and heading
    visualization: Snippet; // The visualization part of the page (which is HTML)
    explanation: Snippet; // The explanation part of the page (which is HTML)
  }

  let { title, visualization, explanation }: Props = $props();
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
    <!-- Put the explanation first so people know how ot use the viusalization -->
    <h1>Explanation</h1>
    {@render explanation()}
    <hr />
    <h1>Visualization</h1>
    {@render visualization()}
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
</style>
