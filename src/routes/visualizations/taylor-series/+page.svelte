<script lang="ts">
  // TODO: clean these up
  import VisualizationPage from "../VisualizationPage.svelte";
  import Graph from "$lib/components/Graph.svelte";
  import * as Colors from "$lib/colors";
  import type { Function, DisplayFunction } from "$lib/maths/function";
  import * as Functions from "$lib/maths/functions";
  import { taylor } from "$lib/maths/taylor";
  import { Math } from "svelte-math";
  import { lerp, smoothstep } from "$lib/maths/lerp";
  import * as latex from "$lib/maths/latex";

  // TODO: look through the code

  // #region Functions

  const functions: Record<string, Function> = {
    sin: Functions.Sin,
    cos: Functions.Cos,
    exp: Functions.Exp,
  }

  function getFunctionDerivative() : (n: number) => Function
  {
    switch (currentFunctionName) {
      case "sin":
        return Functions.getSinDerivative;
      case "cos":
        return Functions.getCosDerivative;
      case "exp":
        return Functions.getExpDerivative;
      default:
        return Functions.getEmptyDerivative;
    }
  }

  // #endregion

  const maxIterations = 15;
  const animationTime = 1000; // In milliseconds
  const animationSteps = 100;


  let currentFunctionName = $state("sin");
  let currentFunction = $derived(functions[currentFunctionName]);

  let a = $state(0); // Point the series is calculated around
  let iterations = $state(1);
  let previousIterations = $state(1); // Used to animate the graph
  let animationProgress = $state(0); // Used to smooth out the iterations
  let animationInterval: null | number = $state(null);

  function setIterations(newIterations: number, playAnimation: boolean = true) {
    if (newIterations < 0 || newIterations > maxIterations) {
      return;
    }

    previousIterations = iterations;
    iterations = newIterations;

    // Cancel already started animation
    if (animationInterval !== null)
      clearInterval(animationInterval);

    if (!playAnimation)
      return;
    
    // Start the animation
    const stepTime = animationTime / animationSteps;
    animationProgress = 0;

    let currentSteps = 0;
    animationInterval = setInterval(() => {
      currentSteps++;
      animationProgress = currentSteps / animationSteps;
    }, stepTime);

    // Run once the animation is done to clear the interval
    setTimeout(() => {
      animationProgress = 1;

      if (animationInterval !== null)
        clearInterval(animationInterval);
    }, animationTime);
  }
</script>

<VisualizationPage title="Taylor Series">
  {#snippet visualization()}
    <div class="inputs">
      <div>
        <span>Function</span>
        <select name="test" id="test" bind:value={currentFunctionName}>
          <option value="sin">sin(x)</option>
          <option value="cos">cos(x)</option>
          <option value="exp">e^x</option>
        </select>
      </div>

      <div>
        <button class="button" onclick={() => setIterations(iterations + 1)}>Next Iteration</button>
        <button class="button" onclick={() => setIterations(iterations - 1)}>Previous Iteration</button>
      </div>
      
      <div class="slider">
        <span><Math latex="iterations = {iterations}" /> (between 0 and {maxIterations})</span>
        <input
          type="range"
          bind:value={
            () => iterations,
            (value) => setIterations(value, false)
          }
          min={0}
          max={15}
        />
      </div>

      <div class="slider">
        <span><Math latex="a = {a}" /> (between -10 and 10)</span>
        <input type="range" name="test2" id="test2" bind:value={a} min={-10} max={10} step={0.01} />
      </div>
    </div>
    
    <Graph
      id="taylor-series-graph"
      width={700}
      height={500}
      initialScale={{ x: 1 / 10, y: 1 / 10 }}
      hasNiceBorders={true}
      functions={[
        {
          name: "f(x)",
          color: () => Colors.ContrastRed,
          func: currentFunction,
        },
        {
          name: "taylor(x)",
          color: () => Colors.ContrastBlue,
          func: (x: number) => lerp(
            taylor(x, a, previousIterations, getFunctionDerivative()),
            taylor(x, a, iterations, getFunctionDerivative()),
            smoothstep(animationProgress)
          )
        }
      ]}
    />
  {/snippet}
  
  {#snippet explanation()}
    <p>A taylor series is an infinite sum of polynomials used to approximate a function, but only near the point <Math latex="a" />, which is the point the series is calculated around.</p>
    <p>A taylor series works by calculating the derivatives of the original function, substituting <Math latex="a" /> for <Math latex="x" />, then integrating these derivatives to create a polynomial that will eventually converge to the original function.</p>
    <p>Not all taylor series will converge back to the original function, and some will only converge close to the point <Math latex="a" />.</p>
    <p>The equation for a taylor series is given by the following formula:</p>
    <p class="taylor-series-math"><Math latex={latex.taylorSeries} displayMode /></p>
  {/snippet}
</VisualizationPage>

<style>
  .inputs {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: 0.5em;

    & > div {
      display: flex;
      align-items: center;
      justify-content: center;/* TODO: max width?*/
      gap: 1em;
      margin-left: 5em;
      margin-right: 5em;

      &.slider {
        justify-content: space-between;
      }
    }
  }

  :global {
    .taylor-series-math math {
      font-size: 2rem;
    }

    #taylor-series-graph {
      align-self: center;
    }
  }
</style>
