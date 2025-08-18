<script lang="ts">
  import Graph from "$lib/components/Graph.svelte";
  import type { Domain } from "$lib/maths/function";
  import * as Styles from "$lib/styles";
  import { Sin } from "$lib/maths/functions";
  import { lerp } from "$lib/maths/lerp";
  import { base } from "$app/paths";
  import { Math } from "svelte-math";
</script>

<svelte:head>
  <title>Phobos</title>
</svelte:head>

<!-- First section, contains logo and a motto -->
<section id="section-1" class="first">
  <div class="mg title-card">
    <div class="title">
      <img src="{base}/favicon.svg" alt="Logo">
      <h1>Phobos</h1>
    </div>
    
    <h2>Maths - Visualized</h2>
    <hr />
  </div>

  <div class="navigation-buttons">
    <a class="button" href="#section-2">Learn More</a>
    <a class="button" href="{base}/visualizations">Visualizations</a>
  </div>
</section>

<!-- Second section, explains values -->
<section id="section-2">
  <div class="mg">
    <h2>Open Source Knowledge without a Pricetag</h2>
  </div>
</section>

<!-- Third section, shows some demos -->
<section id="section-3">
  <div class="mg explanation">
    <h2>Handcrafted Visualizations</h2>
    <p>Interactive visualizations handcrafted to be as intuitive as possible to learn with.</p>
  </div>

  <div class="mg">
    <h2>Check Some Out</h2>
    <a class="button" href="{base}/visualizations">Click here</a>

    <Graph
      width={640}
      height={360}
      allowsUserInput={false}
      hasNiceBorders={true}
      id="visualizations-graph"
    />
  </div>
</section>

<style>
  section {
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    /* The first section will be shorter since the header will take up space and there is also some extra padding */
    &.first {
      /*
        Base height - 100vh
        Subtract 1em for padding of <main>
        Subtract 1em for the top margin of the <header>
        Subtract 75px for the height of the <header>
        Subtract 2em for the padding of the <header>
      */
      min-height: calc(100vh - 1em - 1em - 75px - 2em);
    }
  }

  #section-1 {
    gap: 5em;

    .title-card {
      padding: 3em;
      align-self: center;

      .title {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 1em;

        h1 {
          font-size: 5rem;
        }

        img {
          height: 5em;
        }
      }
    }

    .navigation-buttons {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 1em;

      a {
        width: 150px;
        text-align: center;
      }
    }
  }

  #section-2 {
  }

  #section-3 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1em;

    .mg {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1em;

      height: 525px;
    }

    .explanation {
      max-width: 30vw;
    }
  }
</style>