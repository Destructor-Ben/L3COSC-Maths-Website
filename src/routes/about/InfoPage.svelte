<script lang="ts">
  import Title from "$lib/components/Title.svelte";
  import type { Snippet } from "svelte";

  // This component is the template page for the informational pages
  // This isn't a layout because we need to be able to pass in props

  interface Props {
    children: Snippet; // The contents of the page
    title: string; // Used in the page title + heading
  }

  let { children, title }: Props = $props();
</script>

<Title {title} />

<!--
  A container is needed since we want the content to have a gap, but we can't set it on <main>
  without messing with other pages.
 -->
<div class="container">
  <div class="mg heading">
    <h1>{title}</h1>
  </div>

  <div class="mg content">
    <!-- Content goes here -->
    {@render children()}
    <hr />
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
    justify-content: center;
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

    /* Fixes the horizontal rule adding making the div seem too large */
    hr {
      margin-bottom: 0;
    }
  }
</style>
