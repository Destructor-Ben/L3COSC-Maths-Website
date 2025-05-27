<script lang="ts">
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;

  let iterations = $state(0);

  // TODO: move to math utils
  function factorial(n: number): number {
    if (n <= 1)
      return 1;

    return n * factorial(n - 1);
  }

  function taylor(functions: { (x: number): number }[], iterations: number, x: number, a: number): number {
    let sum = 0;

    for (let n = 0; n <= iterations; n++) {
      sum += functions[n](a) / factorial(n) * Math.pow(x - a, n);
    }

    return sum;
  };

  // Set up canvas
  $effect(() => {
    canvas = document.getElementById('canvas') as HTMLCanvasElement;
    ctx = canvas.getContext('2d');
  });

  // Drawing
  $effect(() => {
    if (!ctx)
      return;

    // Background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Axes
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    // Defining the functions
    const f0 = (x: number) => Math.sin(x);
    const f1 = (x: number) => Math.cos(x);
    const f2 = (x: number) => -Math.sin(x);
    const f3 = (x: number) => -Math.cos(x);
    const functions = [f0, f1, f2, f3, f0, f1, f2, f3];

    // The original function
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    for (let x = -canvas.width / 2; x < canvas.width / 2; x++) {
      const y = f0(x * 0.01) * 100; // Scale the function
      ctx.lineTo(canvas.width / 2 + x, canvas.height / 2 - y);
    }
    ctx.stroke();

    // Taylor series
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    for (let x = -canvas.width / 2; x < canvas.width / 2; x++) {
      const y = taylor(functions, iterations, x * 0.01, Math.PI/2) * 100; // Taylor series around 0
      ctx.lineTo(canvas.width / 2 + x, canvas.height / 2 - y);
    }
    ctx.stroke();
  });

  // Timer
  $effect(() => {
    const interval = setInterval(() => {
      iterations += 1;
      if (iterations > 7) {
        iterations = 0;
      }
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<canvas id="canvas" width="800" height="600"></canvas>

<style>
  #canvas {
    border: 1px solid black;
  }
</style>
