<script lang="ts">
  import Graph from "$lib/components/Graph.svelte";
  import * as Colors from "$lib/colors";
</script>

<Graph
  width={700}
  height={500}
  initialScale={{ x: 10, y: 10 }}
  functions={[
    { name: "sin(x)", func: (x: number) => Math.sin(x), color: Colors.ContrastRed },
    { name: "cos(x)", func: (x: number) => Math.cos(x), color: Colors.ContrastBlue },
    { name: "tan(x)", func: (x: number) => Math.tan(x), color: Colors.ContrastGreen },
    //{ name: "sec(x)", func: (x: number) => 1 / Math.cos(x), color: Colors.ContrastCyan },
    //{ name: "csc(x)", func: (x: number) => 1 / Math.sin(x), color: Colors.ContrastMagenta },
    //{ name: "cot(x)", func: (x: number) => 1 / Math.tan(x), color: Colors.ContrastYellow },
  ]}
/>
