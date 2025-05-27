import * as Colors from '../colors';

export type Function = 
{
  name: string;
  func: (x: number) => number; // This is assumed to be continuous
  color: string;
  lineWidth?: number; // Set to null for a default value
};

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
    const xAxisY = this.height / 2 - this.cameraY;
    const yAxisX = this.width / 2 - this.cameraX;

    ctx.strokeStyle = Colors.LightColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, xAxisY);
    ctx.lineTo(this.width, xAxisY);
    ctx.moveTo(yAxisX, 0);
    ctx.lineTo(yAxisX, this.height);
    ctx.stroke();

    // TODO: arrows

    // Grid
    // TODO

    // The functions
    this.functions.forEach(func => {
      for (let x = 0; x < this.width; x++)
      {
        const y = func.func(x);

        if (x === 0)
        {
          ctx.strokeStyle = func.color;
          ctx.lineWidth = func.lineWidth ?? 1;
          ctx.beginPath();
          ctx.moveTo(x, y);
        }
        else
        {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
    });
  }
}
