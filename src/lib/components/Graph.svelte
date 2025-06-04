<script lang="ts">
  import * as Colors from "../colors";
  import type { Function } from "$lib/maths/function";

  // Canvas state
  let canvas: HTMLCanvasElement;
  let ctx: null | CanvasRenderingContext2D = $state(null);

  // Props
  interface Props
  {
    width: number;
    height: number;
    initialCameraPos?: { x: number; y: number };
    initialScale?: { x: number; y: number };
    functions?: Array<Function>;
  }

  let {
    width, 
    height,
    initialCameraPos = { x: 0, y: 0 },
    initialScale = { x: 1, y: 1 },
    functions = [],
  }: Props = $props();

  // Camera
  let cameraPos = $state(initialCameraPos);
  let scale = $state(initialScale);

// TODO: move teh effects into functions since it makes them easier to read, since svelte will track dependencies in indirect functions, which means I can have as many funtifunctions as I want (as long as they are aclled synchronously)
  // Set up canvas
  $effect(() =>
  {
    canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    if (!context)
      throw new Error("2D canvas not available");

    ctx = context!;
    width = canvas.width;
    height = canvas.height;
  });

  // Render whenever the graph data changes
  $effect(() =>
  {
    if (!ctx)
      return;

    const c = ctx!;

    // Background
    c.fillStyle = Colors.BackgroundColor;
    c.fillRect(0, 0, width, height);

    // Axes
    const origin = toCanvasCoords(0, 0);
    const linePadding = 15;

    c.strokeStyle = Colors.LightColor;
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(linePadding, origin.y);
    c.lineTo(width - linePadding, origin.y);
    c.moveTo(origin.x, linePadding);
    c.lineTo(origin.x, height - linePadding);
    c.stroke();

    // TODO: arrow heads on the axes

    // Grid - TODO
    // TODO: units on the axes

    // The functions
    functions.forEach(func => {
      const minX = fromCanvasCoords(0, 0).x;
      const maxX = fromCanvasCoords(canvas.width, 0).x;
      // TODO: this should be dynamic and increase near discontinuities
      const steps = 100; // TODO: this number isn't the exact number, and sometimes the function goes off the side of the screen
      const step = (maxX - minX) / steps;

      for (let x = minX; x <= maxX; x += step)
      {
        const y = func.func(x);
        const coords = toCanvasCoords(x, y);

        if (x === minX)
        {
          // Start the line
          c.strokeStyle = func.color;
          c.lineWidth = 5;
          c.lineCap = "round";
          c.lineJoin = "round";
          c.beginPath();
          c.moveTo(coords.x, coords.y);
          continue;
        }

        // Continue drawing
        c.lineTo(coords.x, coords.y);
      }

      // Finish the line
      c.stroke();
    });
  });

  // TODO: ensure both of these work

// TODO: maybe rework how these work since Idk how to apply rotation to imags and it might just be easier to use transforms for everything
  // #region Cartesian coords to canvas coords

  function toCanvasCoords(x: number, y: number): { x: number, y: number }
  {
    return {
      x: (x + cameraPos.x) * width / scale.x + width / 2,
      y: (y + cameraPos.y) * height / scale.y + height / 2,
    };
  }

  function fromCanvasCoords(x: number, y: number): { x: number, y: number }
  {
    return {
      x: (x - width / 2) / width * scale.x - cameraPos.x,
      y: (x - height / 2) / height * scale.y - cameraPos.y,
    };
  }

  // #endregion

  // #region Input

  function handleMouseWheel(event: WheelEvent)
  {
    event.preventDefault();
    const delta = event.deltaY > 0 ? 1.1 : 0.9;
    scale.x *= delta;
    scale.y *= delta;
  }

  // #endregion
</script>

<div class="graph">
  <canvas
    id="canvas"
    width={width}
    height={height}
    onwheel={handleMouseWheel}
  ></canvas>
</div>
