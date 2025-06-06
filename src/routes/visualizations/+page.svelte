<script lang="ts">
  import Graph from "$lib/components/Graph.svelte";
  import type { Domain, Function } from "$lib/maths/function";
  import * as Colors from "$lib/colors";
</script>

<Graph
  width={700}
  height={500}
  initialScale={{ x: 10, y: 10 }}
  functions={[
    { name: "sin(x)", color: Colors.ContrastRed,   func: (x: number) => Math.sin(x) },
    { name: "cos(x)", color: Colors.ContrastBlue,  func: (x: number) => Math.cos(x) },
    { name: "tan(x)", color: Colors.ContrastGreen, func: (x: number) => Math.tan(x),
      getDomain: (a: number, b: number) => {
        const domains = [];

        // TODO: proper implementation
        domains.push({
          start: -Math.PI / 2,
          end: Math.PI / 2,
          includeStart: false,
          includeEnd: false,
        });

        return domains;
      }
    },
  ]}
/>
