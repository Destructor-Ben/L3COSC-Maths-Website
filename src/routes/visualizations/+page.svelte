<script lang="ts">
  import Graph from "$lib/components/Graph.svelte";
  import * as Colors from "$lib/colors";
</script>

<Graph
  width={800}
  height={600}
  scale={{ x: 10, y: 10 }}
  functions={[
    { name: "f(x)", func: (x: number) => Math.sin(x), color: Colors.ContrastRed },
    { name: "g(x)", func: (x: number) => Math.cos(x), color: "blue" }
  ]}
/>
