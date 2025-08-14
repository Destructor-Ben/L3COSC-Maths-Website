<script>
  import { base } from "$app/paths";
</script>

<header class="mg">
  <a href="{base}/" class="logo-link">
    <img src="{base}/favicon.svg" alt="Logo">
    <h1>Phobos</h1>
  </a>

  <div class="links">
    <a href="{base}/">Home</a>
    <a href="{base}/visualizations">Visualizations</a>
    <a href="{base}/about">About</a>
  </div>
</header>

<style>
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1em;
    margin-bottom: 0;

    /* Direct children should be flex boxes too */
    & > * {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1em;
    }

    /*
      It's hard to make the buttons equally spaced from the top and bottom versus the right,
      so we calculate it.
     */
    --header-height: 75px;
    --button-height: 60px;
    --button-padding: calc((var(--header-height) - var(--button-height)) / 2);

    img {
      height: var(--header-height);
    }

    /* Revert default styles on the logo link */
    .logo-link {
      text-decoration: none;
    }

    .links {
      align-items: center;
      align-self: stretch;
      margin-right: var(--button-padding);
    }

    /* Heading buttons - these styles are mostly copied from regular buttons but are modified quite a bit */
    a:not(.logo-link) {
      height: var(--button-height);
      padding: 0em 1em;
      border-radius: 1em;

      font-size: 1.25rem;
      text-decoration: none;
      font-family: var(--font-heading);

      display: flex;
      align-items: center;

      background-color: var(--col-fg);
      border: var(--border);
      box-shadow: var(--shadow-fg);
      transition-property: background-color, box-shadow;

      &:hover {
        background-color: var(--col-hover);
        box-shadow: var(--shadow-mg);
      }

      &:active {
        background-color: var(--col-highlight);
      }
    }
  }
</style>
