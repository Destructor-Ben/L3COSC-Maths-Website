<script lang="ts">
	import Graph from "$lib/components/Graph.svelte";
	import * as Colors from "$lib/colors";
  import type { Func, Function } from "$lib/maths/function";
  import * as Functions from "$lib/maths/functions";
	import { taylor } from "$lib/maths/taylor";

  let currentFunction = $state("sin");
  let a = $state(0);
  let iterations = $state(1);

  const functions: Record<string, Function> = {
    sin: Functions.Sin,
    cos: Functions.Cos,
    tan: Functions.Tan,
    exp: Functions.Exp,
  }

  // TODO: make this a GetDerivative function since sin and cosine have repeating derivatives
  const derivatives: Record<string, Array<Func>> = {
    sin: [
      Functions.Sin.func,
      Functions.Cos.func,
      (x: number) => -Functions.Sin.func(x),
      (x: number) => -Functions.Cos.func(x),
    ],
    cos: [
      Functions.Cos.func,
      (x: number) => -Functions.Sin.func(x),
      (x: number) => -Functions.Cos.func(x),
      Functions.Sin.func,
    ],
    tan: [
      Functions.Tan.func,
    ],
    exp: [
      Functions.Exp.func,
    ],
  }

  function getFunction(): Function
  {
    const func = functions[currentFunction];
    func.name = "f(x)";
    func.color = Colors.ContrastRed;
    return func;
  }

  function getTaylorFunction(): Function
  {
    return {
      name: "taylor(x)",
      color: Colors.ContrastBlue,
      func: (x: number) => taylor(x, a, iterations, derivatives[currentFunction]),
    };
  }
</script>

<h1>Taylor Series</h1>

<p>TODO: mathematical explanation</p>

<select name="test" id="test" bind:value={currentFunction}>
  <option value="sin">sin(x)</option>
  <option value="cos">cos(x)</option>
  <option value="tan">tan(x)</option>
  <option value="exp">e^x</option>
</select>

<input type="range" name="test1" id="test1" bind:value={iterations} min={0} max={derivatives[currentFunction].length}/>
<input type="range" name="test2" id="test2" bind:value={a} min={-10} max={10} />

<Graph
  width={700}
  height={500}
  functions={[
    getFunction(),
    getTaylorFunction(),
  ]}
/>
