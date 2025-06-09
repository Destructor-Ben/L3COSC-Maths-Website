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

        // This seems to still have issues but it mostly works
        // TODO: investigate if the issues are with this function or the rendering
        const minValue = Math.ceil(a / Math.PI);
        const maxValue = Math.floor(b / Math.PI);

        for (let i = minValue; i <= maxValue; i++) {
          const start = i * Math.PI - Math.PI / 2;
          const end = i * Math.PI + Math.PI / 2;

          domains.push({
            start: start,
            end: end,
            includeStart: false,
            includeEnd: false,
          });
        }

        return domains;
      }
    },
  ]}
/>
