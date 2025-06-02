import * as Colors from '../colors';
import type { Function } from '../maths/function';

export default class GraphRenderer
{
  // Camera
  cameraX: number = 0;
  cameraY: number = 0;
  scaleX: number = 10;
  scaleY: number = 10;

  // Functions to draw on the graph
  functions: Array<Function> = [];

  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  constructor(canvas: HTMLCanvasElement)
  {
    const ctx = canvas.getContext("2d");
    if (!ctx)
      throw new Error("2D canva not available");

    this.ctx = ctx!;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  // This will change the dimensions of the canvas (called to change the dimensions)
  resize(width: number, height: number)
  {
    this.width = width;
    this.height = height;
    this.ctx.canvas.width = width;
    this.ctx.canvas.height = height;
  }

  render()
  {
    const ctx = this.ctx;

    // Background
    ctx.fillStyle = Colors.BackgroundColor;
    ctx.fillRect(0, 0, this.width, this.height);

    // Axes
    const origin = this.toCanvasCoords(0, 0);

    ctx.strokeStyle = Colors.LightColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, origin.y);
    ctx.lineTo(this.width, origin.y);
    ctx.moveTo(origin.x, 0);
    ctx.lineTo(origin.x, this.height);
    ctx.stroke();

    // TODO: arrows

    // Grid
    // TODO

    // The functions
    this.functions.forEach(func => {
      // TODO: calculate the left and right of the view space and use them as -1 and 1 instead
      for (let x = -6.28; x <= 6.28; x += 0.01)
      {
        const y = func.func(x);
        const coords = this.toCanvasCoords(x, y);

        // TODO: don't hardcode this
        if (x === -6.28)
        {
          ctx.strokeStyle = func.color;
          ctx.lineWidth = 1;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.beginPath();
          ctx.moveTo(coords.x, coords.y);
        }
        else
        {
          ctx.lineTo(coords.x, coords.y);
        }
      }

      ctx.stroke();
    });
  }

  // TODO: implemen this by changing the canvases coordinate system
  private toCanvasCoords(x: number, y: number): { x: number, y: number }
  {
    return {
      x: (x + this.cameraX) * this.width / this.scaleX + this.width / 2,
      y: (y + this.cameraY) * this.height / this.scaleY + this.height / 2
    };
  }
}
