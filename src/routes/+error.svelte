<script>
  import { page } from "$app/state";
</script>

<svelte:head>
  <title>Phobos - Error</title>
</svelte:head>

<div class="error-root">
  <div class="mg">
    <div>
      <h1>An Error Occurred</h1>
      <h2>{page.status} - {page.error?.message}</h2>
    </div>
    
    <a href="/" class="button">Home</a>
  </div>
</div>

<style>
  .error-root {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .mg {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20vh;
      padding: 3em;
    }

    h1 {
      font-size: 5rem;
    }
  }
</style>
