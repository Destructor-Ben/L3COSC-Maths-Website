<script lang="ts">
  import GraphRenderer from "$lib/renderers/graph-renderer";

  let canvas: HTMLCanvasElement;
  let renderer: GraphRenderer;

  // TODO: make a type for this
  let graphData: any = $state({
    cameraX: 0,
    cameraY: 0,
    scaleX: 10,
    scaleY: 10
  });

  // Set up canvas
  $effect(() => {
    canvas = document.getElementById('canvas') as HTMLCanvasElement;
    renderer =  new GraphRenderer(canvas);

    renderer.functions.push(
      { name: "f(x)", func: (x: number) => Math.sin(x), color: "red" },
      { name: "g(x)", func: (x: number) => Math.cos(x), color: "blue" }
    )
  });

  // Render whenever the graph data changes
  $effect(() => {
    // Set the state of the renderer
    renderer.cameraX = graphData.cameraX;
    renderer.cameraY = graphData.cameraY;
    renderer.scaleX = graphData.scaleX;
    renderer.scaleY = graphData.scaleY;

    renderer.render();
  });
</script>

<canvas id="canvas" width="800" height="600"></canvas>

<style>
  #canvas {
    border: 1px solid black;
  }
</style>
