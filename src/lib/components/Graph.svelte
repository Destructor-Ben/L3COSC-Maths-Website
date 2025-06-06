<script lang="ts">
  import { untrack } from "svelte";
  import * as Colors from "../colors";
  import type { Function } from "$lib/maths/function";
  import type { Point } from "$lib/maths/point";
  import ArrowIcon from "../img/arrow.svg";

  // Canvas state
  let canvas: HTMLCanvasElement;
  let ctx: null | CanvasRenderingContext2D = $state(null);

  // Props
  interface Props
  {
    width: number;
    height: number;
    initialCameraPos?: Point;
    initialScale?: Point;
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

  // #region Loading Assets

  // Images are weird because I need to use async loading for them
  let arrowImage: HTMLImageElement | null = $state(null);

  async function loadImage(name: string, src: string): Promise<HTMLImageElement>
  {
    return new Promise((resolve, reject) =>
    {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
  }

  async function loadImages()
  {
    try
    {
      arrowImage = await loadImage("arrow", ArrowIcon);
    }
    catch (err)
    {
      console.error(`Failed to load images: ${err}`);
    }
  }
  
  $effect(() =>
  {
    // Don't ever want to re run this code, should only load once
    untrack(loadImages);
  });

  // #endregion

  // #region Rendering

  function drawAxes(c: CanvasRenderingContext2D)
  {
    // Draw each axis
    drawAxis(1, 0, "x", c);
    drawAxis(-1, 0, "-x", c);
    drawAxis(0, 1, "y", c);
    drawAxis(0, -1, "-y", c);
  }

  function drawAxis(axisX: number, axisY: number, label: string, c: CanvasRenderingContext2D)
  {
    const origin = toCanvasCoords(0, 0); // Where the origin is on the screen
    const linePadding = 15;
    const arrowScale = 0.2;
    const minDstFromOrigin = 50;

    // Calculate the end point of the axis line
    let endPoint = {
      x: axisX === 0 ? origin.x : width * (axisX * 0.5 + 0.5),
      y: axisY === 0 ? origin.y : height * (axisY * 0.5 + 0.5),
    };

    // Padding
    if (axisY === 0)
      endPoint.x -= linePadding * Math.sign(axisX);
    
    if (axisX === 0)
      endPoint.y -= linePadding * Math.sign(axisY);

    // Clamping the end point so it doesn't get close to the origin
    if (axisY === -1 && origin.y - endPoint.y < minDstFromOrigin)
      endPoint.y = origin.y - minDstFromOrigin;

    if (axisY === 1 && origin.y - endPoint.y > -minDstFromOrigin)
      endPoint.y = origin.y + minDstFromOrigin;

    if (axisX === -1 && origin.x - endPoint.x < minDstFromOrigin)
      endPoint.x = origin.x - minDstFromOrigin;

    if (axisX === 1 && origin.x - endPoint.x > -minDstFromOrigin)
      endPoint.x = origin.x + minDstFromOrigin;

    // Draw the line
    c.resetTransform();
    c.strokeStyle = Colors.LightColor;
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(origin.x, origin.y);
    c.lineTo(endPoint.x, endPoint.y);
    c.stroke();

    // Draw the arrow head
    if (arrowImage !== null)
    {
      const arrowSize = { x: arrowImage.width * arrowScale, y: arrowImage.height * arrowScale };

      let rotation = 0;
      let offsetSigns = { x: 1, y: 1, };

      // Hardcoded ;-;
      if (axisY === 1)
      {
        rotation = Math.PI;
        offsetSigns.x = -1;
        offsetSigns.y = -1;
      }
      else if (axisX != 0)
      {
        rotation = Math.PI / 2 * Math.sign(axisX);
        offsetSigns.x = -Math.sign(axisX);
        offsetSigns.y = axisX == -1 ? -1 : 1;
      }

      c.resetTransform();
      c.translate(endPoint.x - arrowSize.x / 2 * offsetSigns.x, endPoint.y - arrowSize.y / 2 * offsetSigns.y);
      c.rotate(rotation);
      c.drawImage(arrowImage, 0, 0, arrowSize.x, arrowSize.y);
    }

    // Draw the label for the axis
    // TODO
  }

  function drawGrid(c: CanvasRenderingContext2D)
  {
    // Grid - TODO
    // TODO: units on the axes
  }

  function drawFunctions(c: CanvasRenderingContext2D)
  {
    c.resetTransform();

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
  }

  // Render whenever the graph data changes
  $effect(() =>
  {
    if (!ctx)
      return;

    const c = ctx!;

    // Background
    c.resetTransform();
    c.fillStyle = Colors.BackgroundColor;
    c.fillRect(0, 0, width, height);

    drawAxes(c);
    drawGrid(c);
    drawFunctions(c);
  });

  // #endregion

  // TODO: ensure both of these work
// TODO: maybe rework how these work since Idk how to apply rotation to imags and it might just be easier to use transforms for everything
  // #region Cartesian coords to canvas coords

  function toCanvasCoords(x: number, y: number): Point
  {
    return {
      x: (x + cameraPos.x) * width / scale.x + width / 2,
      y: (y + cameraPos.y) * height / scale.y + height / 2,
    };
  }

  function fromCanvasCoords(x: number, y: number): Point
  {
    return {
      x: (x - width / 2) / width * scale.x - cameraPos.x,
      y: (x - height / 2) / height * scale.y - cameraPos.y,
    };
  }

  // #endregion

  // #region Input

  function handleMouseMove(event: MouseEvent)
  {
    // Check if the left mouse button is pressed
    if (!(event.buttons & 1))
      return;

    // Move the camera
    // TODO: check if the signs of these are correct
    // TODO: the scaling for this is dodgy, leads to the mouse sliding around
    cameraPos.x += event.movementX * scale.x / 500;
    cameraPos.y += event.movementY * scale.y / 500;
  }

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
    onmousemove={handleMouseMove}
    onwheel={handleMouseWheel}
  ></canvas>
</div>
