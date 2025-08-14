<script>
  import { page } from "$app/state";
  import Title from "$lib/components/Title.svelte";
</script>

<Title title="Error" />

<div class="error-root">
  <div class="mg">
    <h1>An Error Occurred</h1>
  </div>
  
  <!-- Display the error code and message -->
  <div class="mg error-info">
    <h2>{page.status} - {page.error?.message}</h2>
    <a href="/" class="button">Home</a>
  </div>
</div>

<style>
  .error-root {
    /* Grow to fill the parent container */
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5em;

    h1 {
      padding: 0.25em;
      font-size: 5rem;
    }

    .error-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1em;
      padding: 2em;
    }
  }
</style>
