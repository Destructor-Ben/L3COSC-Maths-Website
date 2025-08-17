<script lang="ts">
  import VisualizationPage from "../VisualizationPage.svelte";
  import * as Styles from "$lib/styles";
  import * as Functions from "$lib/maths/functions";
  import * as latex from "$lib/maths/latex";
  import { taylor } from "$lib/maths/taylor";
  import { Math } from "svelte-math";
  import { lerp, smoothstep } from "$lib/maths/lerp";
  import type { Function, DisplayFunction } from "$lib/maths/function";

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

  let currentFunctionName = $state("sin");
  let currentFunction = $derived(functions[currentFunctionName]);

  const maxIterations = 15; // Maximum number of iterations

  let a = $state(0.5); // The x value the series is calculated around
  let iterations = $state(1); // The number of iterations of the series
  let previousIterations = $state(1); // The previous iteration, used for the animation
  let animationProgress = $state(0); // The progress of the animation, from 0 to 1

  let displayFunctions: DisplayFunction[] = $derived(
    [
      {
        name: "f(x)",
        color: () => Styles.ContrastRed,
        func: currentFunction,
      },
      {
        name: "taylor(x)",
        color: () => Styles.ContrastBlue,
        func: (x: number) => lerp(
          taylor(x, a, previousIterations, getFunctionDerivative()),
          taylor(x, a, iterations, getFunctionDerivative()),
          smoothstep(animationProgress)
        )
      }
    ]
  );

  const animationTime = 1000; // How long the animation takes in ms

  let animationRunning = false; // Whether the animation is currently running
  let animationStart: DOMHighResTimeStamp | undefined; // The time the animation started

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

  // Changes the iteration of the series, as well as triggers an animation
  function setIterations(newIterations: number, playAnimation: boolean = true) {
    if (newIterations < 0 || newIterations > maxIterations) {
      return;
    }

    previousIterations = iterations;
    iterations = newIterations;

    // Stop the animation if we don't want to play one and don't start a new one
    if (!playAnimation) {
      animationRunning = false;
      animationProgress = 1;
      animationStart = undefined;
      return;
    }
    
    // Start the animation if it hasn't already
    // Stops excess calls to requestAnimationFrame
    // It won't have a visual effect if that does happen but it isn't ideal
    if (!animationRunning) {
      animationRunning = true;
      animationProgress = 0;
      animationStart = undefined;
      requestAnimationFrame(stepAnimation);
    }
    // Handle the animation if it is already running
    // Current behaviour is just to restart the animation
    else {
      animationRunning = true;
      animationProgress = 0;
      animationStart = undefined;
    }
  }
</script>

<VisualizationPage title="Taylor Series" graphID="taylor-series-graph" functions={displayFunctions}>
  {#snippet explanation()}
    <p>A taylor series is an infinite sum of polynomials used to approximate a function, but only near the point <Math latex="a" />, which is the point the series is calculated around.</p>
    <p>A taylor series works by calculating the derivatives of the original function, substituting <Math latex="a" /> for <Math latex="x" />, then integrating these derivatives to create a polynomial that will eventually converge to the original function.</p>
    <p>Not all taylor series will converge back to the original function, and some will only converge close to the point <Math latex="a" />.</p>
    <p>The equation for a taylor series is given by the following formula:</p>
    <p class="big-math"><Math latex={latex.taylorSeries} displayMode /></p>
  {/snippet}

  {#snippet inputs()}
    <div>Function</div>
    <div>
      <select bind:value={currentFunctionName}>
        <option value="sin">sin(x)</option>
        <option value="cos">cos(x)</option>
        <option value="exp">e^x</option>
      </select>
    </div>
    
    <div><span><Math latex="iterations = {iterations}" /> (between 0 and {maxIterations}</span>)</div>
    <div>
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

    <div><span><Math latex="a = {a}" /> (between -10 and 10)</span></div>
    <div>
      <input
        type="range"
        bind:value={a}
        min={-10}
        max={10}
        step={0.01}
      />
    </div>

    <div><button class="button" onclick={() => setIterations(iterations + 1)}>Next Iteration</button></div>
    <div><button class="button" onclick={() => setIterations(iterations - 1)}>Previous Iteration</button></div>
  {/snippet}
</VisualizationPage>

<style>
  /* Make the buttons in the inputs a consistent width */
  .button {
    width: 175px;
  }
</style>
