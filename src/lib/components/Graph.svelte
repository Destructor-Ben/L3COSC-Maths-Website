<script lang="ts">
  import * as Styles from "../styles";
  import type { Domain, DisplayFunction } from "$lib/maths/function";
  import type { Point } from "$lib/maths/point";
  import { getColorsHaveLoaded } from "$lib/global-state.svelte";
  import { inverse, Matrix } from "ml-matrix";
  import { scaleMatrix, translateMatrix } from "$lib/maths/matrix";

  // This is so we can re-render the canvas once the colours load
  const colorsHaveLoaded = getColorsHaveLoaded();

  // Canvas state
  let canvas: HTMLCanvasElement;
  let ctx: null | CanvasRenderingContext2D = $state(null);

  // Props
  interface Props {
    id: string;
    width: number; // In pixels
    height: number; // In pixels
    initialCameraPos?: Point; // In cartesian coordinates
    initialScale?: Point;
    functions?: Array<DisplayFunction>;
    allowsUserInput?: boolean;
    minScale?: number;
    maxScale?: number;
    // Maximum distance between the camera position and the origin
    // Applied on each axis individually, clamping the position in a square
    maxDst?: number;
  }

  let {
    id,
    width,
    height,
    initialCameraPos = { x: 0, y: 0 },
    initialScale = { x: 1, y: 1 },
    functions = [],
    allowsUserInput = true,
    minScale = 0.01,
    maxScale = 5,
    maxDst = 100,
  }: Props = $props();

  // Camera
  let cameraPos = $state(initialCameraPos); // In cartesian coordinates
  let scale = $state(initialScale);

  // Set up canvas when the page loads
  $effect(() => {
    canvas = document.getElementById(id) as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("2D canvas not available");
    }

    ctx = context!;
    width = canvas.width;
    height = canvas.height;
  });

  // #region Rendering

  // Get the end of an axis, handling padding and clamping
  // axisX or axisY should be -1 or 1, not both, e.g. (-1, 0), (1, 0), (0, -1) or (0, 1)
  function getAxisEndpoint(axisX: number, axisY: number): Point {
    const linePadding = 15;
    const minDstFromOrigin = 50;
    const origin = toCanvasCoords(0, 0); // Where the origin is on the screen

    let endPoint = {
      x: axisX === 0 ? origin.x : width * (axisX * 0.5 + 0.5),
      y: axisY === 0 ? origin.y : height * (axisY * 0.5 + 0.5),
    };

    // Padding
    if (axisY === 0) {
      endPoint.x -= linePadding * Math.sign(axisX);
    }

    if (axisX === 0) {
      endPoint.y -= linePadding * Math.sign(axisY);
    }

    // Clamping the end point so it doesn't get close to the origin
    if (axisY === -1 && origin.y - endPoint.y < minDstFromOrigin) {
      endPoint.y = origin.y - minDstFromOrigin;
    }

    if (axisY === 1 && origin.y - endPoint.y > -minDstFromOrigin) {
      endPoint.y = origin.y + minDstFromOrigin;
    }

    if (axisX === -1 && origin.x - endPoint.x < minDstFromOrigin) {
      endPoint.x = origin.x - minDstFromOrigin;
    }

    if (axisX === 1 && origin.x - endPoint.x > -minDstFromOrigin) {
      endPoint.x = origin.x + minDstFromOrigin;
    }

    return endPoint;
  }

  function drawAxes() {
    drawAxis(1, 0);
    drawAxis(-1, 0);
    drawAxis(0, 1);
    drawAxis(0, -1);
  }

  function drawAxis(axisX: number, axisY: number) {
    const origin = toCanvasCoords(0, 0);
    const endPoint = getAxisEndpoint(axisX, axisY);

    // Draw the line
    ctx.resetTransform();
    ctx.strokeStyle = Styles.TextColor;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.stroke();
  }

  function drawFunctions() {
    ctx.resetTransform();

    functions.forEach(drawFunction);
  }

  function drawFunction(func: DisplayFunction) {
    // Find the left and right of the screen in cartesian coordinates
    const minX = fromCanvasCoords(0, 0).x;
    const maxX = fromCanvasCoords(canvas.width, 0).x;

    // Get the domain of the function with the default stretching both sides of the screen
    let domains: Array<Domain> = [{ start: minX, end: maxX, includeStart: true, includeEnd: true }];

    if (func.getDomains !== undefined) {
      domains = func.getDomains(minX, maxX);
    }

    // Draw each domain
    domains.forEach((domain) => drawDomain(func, domain));
  }

  function drawDomain(func: DisplayFunction, domain: Domain) {
    // Find start and finish
    let start = domain.start;
    let end = domain.end;

    // If the endpoints can't be included, add/subtract the smallest possible value to them
    // *1000 because I was still having issues using the smallest possible value
    const epsilon = Number.EPSILON * 1000;
    if (!domain.includeStart) {
      start += epsilon;
    }

    if (!domain.includeEnd) {
      end -= epsilon;
    }

    // Calculate the step size
    // The step count should dictate how high res the curve is
    // Too blocky? increase this
    const steps = 300;
    const stepSize = (end - start) / steps;

    // Prevents freezing if start === end since it causes an infinite loop below
    if (stepSize <= 0) {
      return;
    }

    // Start the curve
    const startCoord = toCanvasCoords(start, func.func(start));
    ctx.strokeStyle = func.color();
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(startCoord.x, startCoord.y);

    // Draw curve
    for (let x = start; x <= end; x += stepSize) {
      const y = func.func(x);
      const coords = toCanvasCoords(x, y);
      ctx.lineTo(coords.x, coords.y);
    }

    // Finish the curve
    ctx.stroke();
  }

  function drawArrowsAndLabels() {
    const origin = toCanvasCoords(0, 0);
    const axes = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];

    axes.forEach((axis) => {
      const endPoint = getAxisEndpoint(axis.x, axis.y);

      drawArrow(axis.x, axis.y, endPoint);
      drawLabel(axis.x, axis.y, endPoint);
    });
  }

  function drawArrow(axisX: number, axisY: number, endPoint: Point) {
    const arrowPathSize = 512;
    const arrowScale = 1 / 15;
    // Can't load from file easily because of async in JS being frustrating to deal with
    const arrowPath = new Path2D(
      "M414 321.94L274.22 158.82a24 24 0 00-36.44 0L98 321.94c-13.34 15.57-2.28 39.62 18.22 39.62h279.6c20.5 0 31.56-24.05 18.18-39.62z"
    );

    let rotation = 0;
    let offsetSigns = { x: 1, y: 1 };

    // Hardcoded unfortunately, since the origin of the arrow path is the corner, not centre
    if (axisY === 1) {
      rotation = Math.PI;
      offsetSigns.x = -1;
      offsetSigns.y = -1;
    } else if (axisX != 0) {
      rotation = (Math.PI / 2) * Math.sign(axisX);
      offsetSigns.x = -Math.sign(axisX);
      offsetSigns.y = axisX == -1 ? -1 : 1;
    }

    ctx.resetTransform();
    ctx.translate(
      endPoint.x - ((arrowPathSize * arrowScale) / 2) * offsetSigns.x,
      endPoint.y - ((arrowPathSize * arrowScale) / 2) * offsetSigns.y
    );
    ctx.rotate(rotation);
    ctx.scale(arrowScale, arrowScale);

    ctx.strokeStyle = "";
    ctx.fillStyle = Styles.TextColor;
    ctx.fill(arrowPath);
  }

  function drawLabel(axisX: number, axisY: number, endPoint: Point) {
    // Find label pos
    let labelPos = endPoint;

    if (axisX === 0) {
      labelPos.x += 20; // Y axis
    } else if (axisY === 0) {
      labelPos.y -= 30; // X axis
    }

    // Additional vertical offset for the -y symbol
    if (axisY === 1) {
      labelPos.y -= 5;
    }

    // Find label text
    // The y axis is flipped because +y is down in canvas coords
    let label = "";
    if (axisX === 1) {
      label = "x";
    } else if (axisX === -1) {
      label = "-x";
    } else if (axisY === 1) {
      label = "-y";
    } else if (axisY === -1) {
      label = "y";
    }

    // Draw
    ctx.resetTransform();
    ctx.fillStyle = Styles.TextColor;
    ctx.font = "20px sans-serif";
    ctx.textAlign = axisX === 1 ? "right" : "left";
    ctx.textBaseline = "middle";
    ctx.fillText(label, labelPos.x, labelPos.y);
  }

  // Render whenever the graph data changes
  $effect(() => {
    if (!colorsHaveLoaded.value) {
      return;
    }

    if (!ctx) {
      return;
    }

    // Background
    ctx.resetTransform();
    ctx.fillStyle = Styles.BackgroundColor;
    ctx.fillRect(0, 0, width, height);

    // UI
    drawAxes();
    drawFunctions();
    drawArrowsAndLabels();
  });

  // #endregion

  // #region Coordinate Conversion

  // toCanvasCoords matrix is used to convert cartesian coordinates to canvas coordinates
  // fromCanvasCoords matrix converts from canvas coordinates to cartesian coordinates
  // To convert between coordinates, turn the inputs into a 1x3 matrix and multiple it
  // (done by toCanvasCoords and fromCanvasCoords)

  // This took ages to get working properly
  let toCanvasCoordsMatrix: Matrix = $derived(
    Matrix.identity(3)
      // Camera scale
      .mmul(scaleMatrix(scale.x, scale.y))
      // Scale to screen size
      // Use height for x to so the graphs don't get stretched
      // Half so the camera can be centered
      .mmul(scaleMatrix(height / 2, height / 2))
      // Center the camera
      .mmul(translateMatrix(width / 2, height / 2))
      // Flip screen
      .mmul(scaleMatrix(1, -1))
      .mmul(translateMatrix(0, height))
      // Camera position
      // This scaling could probably be tidied up but it works
      .mmul(
        translateMatrix((-cameraPos.x * scale.x * height) / 2, (cameraPos.y * scale.y * height) / 2)
      )
  );

  let fromCanvasCoordsMatrix: Matrix = $derived.by(() => {
    // Use a try catch to avoid errors when the toCanvasCoordsMatrix isn't invertible
    // This happens when scale is 0 or the app is being built as a static site
    try {
      return inverse(toCanvasCoordsMatrix);
    } catch (error) {
      return Matrix.identity(3);
    }
  });

  function toCanvasCoords(x: number, y: number): Point {
    const vector = new Matrix([[x, y, 1]]);
    const result = vector.mmul(toCanvasCoordsMatrix);
    return { x: result.get(0, 0), y: result.get(0, 1) };
  }

  function fromCanvasCoords(x: number, y: number): Point {
    const vector = new Matrix([[x, y, 1]]);
    const result = vector.mmul(fromCanvasCoordsMatrix);
    return { x: result.get(0, 0), y: result.get(0, 1) };
  }

  // #endregion

  // #region Input

  function handleMouseMove(event: MouseEvent) {
    if (!allowsUserInput) {
      return;
    }

    // Check if the left mouse button is pressed
    if (!(event.buttons & 1)) {
      return;
    }

    // Move the camera by the mouse delta (in cartesian coordinates)
    const pos = fromCanvasCoords(event.clientX, event.clientY);
    const oldPos = fromCanvasCoords(
      event.clientX - event.movementX,
      event.clientY - event.movementY
    );

    cameraPos.x -= pos.x - oldPos.x;
    cameraPos.y -= pos.y - oldPos.y;

    // Clamp so the user can't go crazy or get lost
    cameraPos.x = Math.min(maxDst, Math.max(-maxDst, cameraPos.x));
    cameraPos.y = Math.min(maxDst, Math.max(-maxDst, cameraPos.y));
  }

  function handleMouseWheel(event: WheelEvent) {
    if (!allowsUserInput) {
      return;
    }

    // Stop the page from scrolling
    event.preventDefault();

    // Find what direction the mouse scrolled in and zoom in/out
    const delta = event.deltaY < 0 ? 1.1 : 0.9;
    scale.x *= delta;
    scale.y *= delta;

    // Clamp within an acceptable range
    scale.x = Math.min(maxScale, Math.max(minScale, scale.x));
    scale.y = Math.min(maxScale, Math.max(minScale, scale.y));
  }

  // #endregion
</script>

<canvas {id} {width} {height} onmousemove={handleMouseMove} onwheel={handleMouseWheel}></canvas>

<style>
  canvas {
    border-radius: 1em;
    border: var(--border);
    box-shadow: var(--shadow-fg);
  }
</style>
