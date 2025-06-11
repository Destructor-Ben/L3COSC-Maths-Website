<script lang="ts">
	import Graph from "$lib/components/Graph.svelte";
	import * as Colors from "$lib/colors";
  import type { Function, DisplayFunction } from "$lib/maths/function";
  import * as Functions from "$lib/maths/functions";
	import { taylor } from "$lib/maths/taylor";

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

  let currentFunctionName = $state("sin");
  let currentFunction = $derived(functions[currentFunctionName]);

  let a = $state(0); // Point the series is calculated around
  let iterations = $state(1);

  function getFunction(): DisplayFunction
  {
    return {
      name: "f(x)",
      color: Colors.ContrastRed,
      func: currentFunction,
      getDomains: getFunctionDomains(),
    };
  }

  function getTaylorFunction(): DisplayFunction
  {
    return {
      name: "taylor(x)",
      color: Colors.ContrastBlue,
      func: (x: number) => taylor(x, a, iterations, getFunctionDerivative())
    };
  }
</script>

<h1>Taylor Series</h1>

<p>TODO: mathematical explanation</p>

<select name="test" id="test" bind:value={currentFunctionName}>
  <option value="sin">sin(x)</option>
  <option value="cos">cos(x)</option>
  <option value="tan">tan(x)</option>
  <option value="exp">e^x</option>
</select>
<br />

<p>Iterations = {iterations} - [0, 15]</p>
<input type="range" name="test1" id="test1" bind:value={iterations} min={0} max={15}/>
<br />

<p>a = {a} (point the series is calculated around) - [-10, 10]</p>
<input type="range" name="test2" id="test2" bind:value={a} min={-10} max={10} step={0.01} />
<br />

<Graph
  width={700}
  height={500}
  functions={[
    getFunction(),
    getTaylorFunction(),
  ]}
/>
