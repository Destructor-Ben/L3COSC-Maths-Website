<script lang="ts">
  import "$lib/style/variables.css";
  import "$lib/style/style.css";
  import * as Colors from "$lib/colors";
  import { type Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();

  // Update JS colours to match CSS
  $effect(Colors.calculateColors);
</script>

<div id="root">
  <header class="mg">
    <div>
      <img src="/favicon.png" alt="Logo">
      <h1>Name</h1>
    </div>

    <div class="links">
      <a href="/">Home</a>
      <a href="/visualizations">Visualizations</a>
      <a href="/">Coming Soon</a>
    </div>
  </header>

  <main>
    {@render children()}
  </main>

  <footer class="mg">
    <p>Copyright © 2025 Destructor_Ben</p>
    <p>TODO: finish</p>
    <p>Licensed under the MIT License</p>
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
    margin: 1em;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1em;
    margin-bottom: 0;

    & > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1em;
    }

    --header-height: 75px;
    --button-height: 60px;
    --button-padding: calc((var(--header-height) - var(--button-height)) / 2);

    img {
      height: var(--header-height);
    }

    .links {
      align-items: center;
      align-self: stretch;
      margin-right: var(--button-padding);
    }

    /* Heading buttons */
    a {
      height: var(--button-height);
      padding: 0em 1em;
      border-radius: 1em;

      font-size: 1.25rem;
      text-decoration: none;
      font-family: var(--font-heading);

      display: flex;
      align-items: center;

      background-color: var(--col-fg);
      border: var(--border);
      border-color: none;
      box-shadow: var(--shadow-fg);
      transition-property: background-color, border-color, box-shadow;

      &:hover {
        background-color: var(--col-highlight);
        box-shadow: var(--shadow-mg);
        border-color: var(--col-highlight);
      }
    }
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1em;
    margin-top: 0;
  }
</style>