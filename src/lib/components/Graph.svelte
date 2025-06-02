<script lang="ts">
  import type { Function } from "$lib/maths/function";
  import GraphRenderer from "$lib/renderers/graph-renderer";

  let canvas: HTMLCanvasElement;
  let renderer: GraphRenderer;

  // TODO: make a type for this
  // TODO: this state should be set to a default value but can be passed in
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

    // TODO: temporary
    renderer.functions.push(
      { name: "f(x)", func: (x: number) => Math.sin(x), color: "red" },
      { name: "g(x)", func: (x: number) => Math.cos(x), color: "blue" }
    )
  });

  // Render whenever the graph data changes
  $effect(() => {
    // Set the state of the renderer
    // TODO: just make each of the fields of the class state and make the renderer reactive state
    renderer.cameraX = graphData.cameraX;
    renderer.cameraY = graphData.cameraY;
    renderer.scaleX = graphData.scaleX;
    renderer.scaleY = graphData.scaleY;

    renderer.render();
  });

  // #region Input

  function handleMouseWheel(event: WheelEvent) {
    event.preventDefault();
    const delta = event.deltaY > 0 ? 1.1 : 0.9;
    graphData.scaleX *= delta;
    graphData.scaleY *= delta;
  }

  // #endregion
</script>

<div class="graph">
  <canvas id="canvas" width="800" height="600" onwheel={handleMouseWheel}></canvas>
</div>
