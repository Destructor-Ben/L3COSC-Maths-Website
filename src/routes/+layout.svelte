<script lang="ts">
  import "$lib/style/variables.css";
  import "$lib/style/style.css";
  import * as Colors from "$lib/colors";
  import { type Snippet } from "svelte";
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";

  let { children }: { children: Snippet } = $props();

  // Update JS colours to match CSS
  $effect(Colors.calculateColors);
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
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1; /* Makes it grow to take up the remaining space */
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 1em;
  }
</style>