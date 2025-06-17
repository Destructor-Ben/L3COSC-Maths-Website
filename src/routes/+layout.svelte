<script lang="ts">
  import type { Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();
</script>

<div id="root">
  <header>
    <img src="/favicon.png" alt="Logo">

    <div>
      <a href="/">Home</a>
      <a href="/visualizations">Visualizations</a>
      <a href="/">Coming Soon</a>
    </div>
  </header>

  <main>
    {@render children()}
  </main>

  <footer>

  </footer>
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
    padding: 1em;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background-color: red;
  }
</style>