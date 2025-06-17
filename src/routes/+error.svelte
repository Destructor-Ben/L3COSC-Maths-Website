<script>
  import { page } from "$app/state";
</script>

<div class="error-root">
  <div>
    <h1>An Error Occurred</h1>
    <h2>{page.status} - {page.error?.message}</h2>
  </div>
  <a href="/" class="link">Home</a>
</div>

<style>
  .error-root {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10rem;

    h1 {
      font-size: 5rem;
    }
  }
</style>
