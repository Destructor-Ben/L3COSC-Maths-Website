<script lang="ts">
  import "$lib/style/variables.css";
  import "$lib/style/style.css";
  import * as Styles from "$lib/styles";
  import { type Snippet } from "svelte";
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";

  let { children }: { children: Snippet } = $props();

  // Update JS styles to match CSS when the page loads
  $effect(Styles.calculateStyles);
</script>

<div id="root">
  <Header />

  <main>
    {@render children()}
  </main>

  <Footer />
</div>

<style>
  #root {
    /* Take up at least the entire screen height */
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    /* Grow to fill the parent container */
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 1em;
  }
</style>
