<header class="mg">
  <div>
    <img src="/favicon.svg" alt="Logo">
    <h1>Phobos</h1>
  </div>

  <div class="links">
    <a href="/">Home</a>
    <a href="/visualizations">Visualizations</a>
    <a href="/about">About</a>
  </div>
</header>

<style>
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1em;
    margin-bottom: 0;

    & > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1em;
    }

    --header-height: 75px;
    --button-height: 60px;
    --button-padding: calc((var(--header-height) - var(--button-height)) / 2);

    img {
      height: var(--header-height);
    }

    .links {
      align-items: center;
      align-self: stretch;
      margin-right: var(--button-padding);
    }

    /* Heading buttons */
    a {
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
