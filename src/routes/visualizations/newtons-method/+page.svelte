<script lang="ts">
  import VisualizationPage from "../VisualizationPage.svelte";
  import * as Colors from "$lib/colors";
  import * as Functions from "$lib/maths/functions";
  import * as latex from "$lib/maths/latex";
  import { taylor } from "$lib/maths/taylor";
  import { Math as Latex } from "svelte-math";
  import { lerp, smoothstep } from "$lib/maths/lerp";
  import type { Function, DisplayFunction } from "$lib/maths/function";

  // #region Functions

  const functions: Record<string, Function> = {
    sin: Functions.Sin,
    cos: Functions.Cos,
    sqrt: (x: number) => Math.sqrt(x) - 2, // -2 so it has a root
    log: Functions.Log,
  }

  // TODO: in this and taylor, just make this derived state
  function getFunctionDerivative() : (n: number) => Function
  {
    switch (currentFunctionName) {
      case "sin":
        return Functions.getSinDerivative;
      case "cos":
        return Functions.getCosDerivative;
      case "sqrt": // TODO: impl
        return Functions.getEmptyDerivative;
      case "log": // TODO: impl
        return Functions.getEmptyDerivative;
      default:
        return Functions.getEmptyDerivative;
    }
  }

  // #endregion

  let currentFunctionName = $state("sin");
  let currentFunction = $derived(functions[currentFunctionName]);

  let xValue = $state(1);

  function nextIteration()
  {
    // TODO: do newtons method
    xValue = xValue - currentFunction(xValue) / getFunctionDerivative()(1)(xValue);
  }

  // TODO: display:
  // - f(x)
  // - tanget at the test point
  let displayFunctions: DisplayFunction[] = $derived(
    [
      {
        name: "f(x)",
        color: () => Colors.ContrastRed,
        func: currentFunction,
      },
      {
        name: "slope(x)",
        color: () => Colors.ContrastBlue,
        // Taylor series iteration 1 is just a tangent line
        func: (x: number) => taylor(x, xValue, 1, getFunctionDerivative()),
      }
    ]
  );
</script>

<VisualizationPage title="Newton's Method" graphID="newtons-method-graph" functions={displayFunctions}>
  {#snippet explanation()}
    TODO
  {/snippet}

  {#snippet inputs()}
    <div>Function</div>
    <div>
      <select bind:value={currentFunctionName}>
        <option value="sin">sin(x)</option>
        <option value="cos">cos(x)</option>
        <option value="log">log(x)</option>
        <option value="sqrt">sqrt(x)</option>
      </select>
    </div>

    <div><span><Latex latex="xValue = {xValue}" /> (between -10 and 10)</span></div>
    <div>
      <input
        type="range"
        bind:value={xValue}
        min={-10}
        max={10}
        step={0.01}
      />
    </div>

    <div>
      <button class="button" onclick={nextIteration}>Run Next Iteration of Newtons method</button>
    </div>
  {/snippet}
</VisualizationPage>
