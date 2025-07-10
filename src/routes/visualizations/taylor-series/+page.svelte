<script lang="ts">
	import Graph from "$lib/components/Graph.svelte";
	import * as Colors from "$lib/colors";
  import type { Function, DisplayFunction } from "$lib/maths/function";
  import * as Functions from "$lib/maths/functions";
  import { taylor } from "$lib/maths/taylor";
  import { Math } from "svelte-math";
  import { lerp, smoothstep } from "$lib/maths/lerp";

  // TODO: remove tan (it's too hard)

  // #region Functions

  const functions: Record<string, Function> = {
    sin: Functions.Sin,
    cos: Functions.Cos,
    tan: Functions.Tan,
    exp: Functions.Exp,
  }

  function getFunctionDomains() {
    switch (currentFunctionName) {
      case "tan":
        return Functions.getTanDomains;
      default:
        return undefined;
    }
  }

  function getFunctionDerivative() : (n: number) => Function
  {
    switch (currentFunctionName) {
      case "sin":
        return Functions.getSinDerivative;
      case "cos":
        return Functions.getCosDerivative;
      case "tan":
        return Functions.getTanDerivative;
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

  const taylorSeriesLatex = "f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x - a)^n";

  let currentFunctionName = $state("sin");
  let currentFunction = $derived(functions[currentFunctionName]);

  let a = $state(0); // Point the series is calculated around
  let iterations = $state(1);
  let previousIterations = $state(1); // Used to animate the graph
  let animationProgress = $state(0); // Used to smooth out the iterations
  let animationInterval: null | number = $state(null);

  function setIterations(newIterations: number) {
    if (newIterations < 0 || newIterations > maxIterations) {
      return;
    }

    previousIterations = iterations;
    iterations = newIterations;

    // Cancel already started animation
    if (animationInterval !== null)
      clearInterval(animationInterval);
    
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

<div class="mg">
  <h1>Taylor Series</h1>
</div>

<div class="mg taylor-series">
  <p class="description">
    A taylor series is an infinite sum of polynomials used to approximate the original function, but only near the point a, the point the series is calculated around.
    <br />
    <br />
    A taylor series works by calculating the derivative of the original function at the point a, and integrating these derivatives to create a polynomial that will eventually converge to the original function.
    <br />
    <br />
    Not all taylor series will converge, and some will only converge for a limited range of x values.
    <br />
    <br />
    The equation for a taylor series is given by the following formula:
    <br />
    <br />
    <Math latex={taylorSeriesLatex} displayMode />
  </p>

  <hr />

  <div class="inputs">
    <p>Function</p>
    <select name="test" id="test" bind:value={currentFunctionName}>
      <option value="sin">sin(x)</option>
      <option value="cos">cos(x)</option>
      <option value="tan">tan(x)</option>
      <option value="exp">e^x</option>
    </select>

    <br />

    <p>Iterations = {iterations} - [0, {maxIterations}]</p>
    <input type="range" name="test1" id="test1" bind:value={
      () => iterations,
      (value) => setIterations(value)
    } min={0} max={15}/>

    <br />

    <div class="buttons">
      <button class="button" onclick={() => setIterations(iterations + 1)}>Next Iteration</button>
      <button class="button" onclick={() => setIterations(iterations - 1)}>Previous Iteration</button>
    </div>

    <p><Math latex="a = {a}" /> (between -10 and 10)</p>
    <input type="range" name="test2" id="test2" bind:value={a} min={-10} max={10} step={0.01} />
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
        getDomains: getFunctionDomains(),
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
</div>

<style>
  .taylor-series {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .buttons {
      display: flex;
      gap: 1em;
    }
  }

  :global {
    main {
      gap: 1em;
    }

    .description math {
      font-size: 2.5rem;
    }

    canvas {
      align-self: center;
    }
  }
</style>
