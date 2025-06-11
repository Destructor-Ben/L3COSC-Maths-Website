<script lang="ts">
  import Graph from "$lib/components/Graph.svelte";
  import type { Domain, DisplayFunction } from "$lib/maths/function";
  import * as Functions from "$lib/maths/functions";
  import * as Colors from "$lib/colors";
</script>

<a href="/visualizations/taylor-series">Taylor Series</a>

<Graph
  width={700}
  height={500}
  initialScale={{ x: 10, y: 10 }}
  functions={[
    { name: "sin(x)", color: Colors.ContrastRed, func: Functions.Sin },
    { name: "cos(x)", color: Colors.ContrastBlue, func: Functions.Cos },
    { name: "tan(x)", color: Colors.ContrastGreen, func: Functions.Tan, getDomains: Functions.getTanDomains },
  ]}
/>
