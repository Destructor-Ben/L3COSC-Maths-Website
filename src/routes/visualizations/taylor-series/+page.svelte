<script lang="ts">
	import Graph from "$lib/components/Graph.svelte";
	import * as Colors from "$lib/colors";
  import type { Func, Function } from "$lib/maths/function";
  import * as Functions from "$lib/maths/functions";
	import { taylor } from "$lib/maths/taylor";

  const functions: Record<string, Function> = {
    sin: Functions.Sin,
    cos: Functions.Cos,
    tan: Functions.Tan,
    exp: Functions.Exp,
  }

  let currentFunctionName = $state("sin");
  let currentFunction = $derived(functions[currentFunctionName]);
  let a = $state(0); // Point the series is calculated around
  let iterations = $state(1);

  function getFunction(): Function
  {
    // TODO: customise the function - might need to clone it so we don't modify the original
    //currentFunction.name = "f(x)";
    //currentFunction.color = Colors.ContrastRed;
    return currentFunction;
  }

  function getTaylorFunction(): Function
  {
    const derivatives = currentFunction.getDerivative;
    if (derivatives === undefined)
      return Functions.Empty;

    return {
      name: "taylor(x)",
      color: Colors.ContrastBlue,
      func: (x: number) => taylor(x, a, iterations, derivatives)
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

<p>Iterations - [0, 15]</p>
<input type="range" name="test1" id="test1" bind:value={iterations} min={0} max={15}/>
<br />

<p>A (point the series is calculated around) - [-10, 10]</p>
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
