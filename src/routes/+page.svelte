<script lang="ts">
  import Graph from "$lib/components/Graph.svelte";
  import type { Domain } from "$lib/maths/function";
  import * as Styles from "$lib/styles";
  import * as Functions from "$lib/maths/functions";
  import { lerp, smoothstep } from "$lib/maths/lerp";
  import { base } from "$app/paths";
  import { Math } from "svelte-math";

  let section2Element: HTMLElement;
  const animationTime = 1000; // How long the animation takes in ms

  // Whether the animation has been triggered
  // Is true even after the animation has finished so it isn't triggered again
  let scrollAnimationTriggered = false;
  let animationProgress = $state(0); // The animation progress between 0 and 1
  let animationRunning = false; // Whether the animation is currently running
  let animationStart: DOMHighResTimeStamp | undefined; // The time the animation started

  function getGraphDomains(a: number, b: number): Domain[]
  {
    return [
      {
        start: a,
        end: lerp(a, b, smoothstep(animationProgress)),
        includeStart: true,
        includeEnd: true,
      }
    ];
  }

  function handleOnScroll()
  {
    if (!document.scrollingElement)
      return;

    const scrollAmount = document.scrollingElement.scrollTop;

    // Trigger the scrolling animation
    if (!scrollAnimationTriggered && scrollAmount >= section2Element.offsetTop)
    {
      scrollAnimationTriggered = true;
      startScrollingAnimation();
    }
  }

  // Start the scrolling animation
  function startScrollingAnimation()
  {
    animationRunning = true;
    animationProgress = 0;
    animationStart = undefined;
    requestAnimationFrame(stepAnimation);
  }

  function stepAnimation(timestamp: DOMHighResTimeStamp) {
    if (!animationRunning)
      return;

    if (animationStart === undefined)
      animationStart = timestamp;

    // Time in ms since the animation started
    const elapsed = timestamp - animationStart!;

    // End the animation
    if (elapsed >= animationTime) {
      animationProgress = 1;
      animationRunning = false;
      animationStart = undefined;
      return;
    }

    // Set the animation progress
    animationProgress = elapsed / animationTime;

    // Request next frame
    requestAnimationFrame(stepAnimation);
  }
</script>

<svelte:document onscroll={handleOnScroll} />

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

<!-- Second section, shows some demos & explains values -->
<section id="section-2" bind:this={section2Element}>
  <div class="mg explanation">
    <h2>Open Source Knowledge Without a Pricetag</h2>
    <p>Free and open source information with no cost at all.</p>
  </div>

  <div class="mg">
    <h2>Handcrafted Visualizations</h2>
    <p>Interactive visualizations handcrafted to be as intuitive as possible to learn with.</p>
    <a class="button" href="{base}/visualizations">See Them Here</a>

    <Graph
      width={640}
      height={360}
      allowsUserInput={false}
      hasNiceBorders={true}
      id="visualizations-graph"
      initialScale={{ x: 1 / 5, y: 1 / 5}}
      functions={[
        {
          name: "sin(x)",
          color: () => Styles.ContrastRed,
          func: Functions.Sin,
          getDomains: getGraphDomains,
        },
        {
          name: "cos(x)",
          color: () => Styles.ContrastBlue,
          func: Functions.Cos,
          getDomains: getGraphDomains,
        },
        {
          name: "exp(x)",
          color: () => Styles.ContrastGreen,
          func: Functions.Exp,
          getDomains: getGraphDomains,
        },
      ]}
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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1em;

    .mg {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 1em;

      height: 550px;
    }

    .explanation {
      max-width: 30vw;
      justify-content: flex-start;
    }
  }
</style>