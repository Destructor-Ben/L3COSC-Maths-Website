<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    title: string; // The label below the thumnail
    link: string; // The link navigated to when the thing is clicked
    children: Snippet; // This will be the thumbnail
    isALink?: boolean; // Used to make a card that doesn't have any functionality
  }

  let {
    title,
    link,
    children,
    isALink = true
  }: Props = $props();
</script>

<!--
  Use different code if we want to make a link or not.
  This is because the more coming soon card isn't a link but needs to have similar styling.
-->
{#if isALink}
  <a class="mg visualization-button is-link" href={link}>
    <div class=thumbnail-container>
      {@render children()}
    </div>

    <h3>{title}</h3>
  </a>
{:else}
  <div class="mg visualization-button">
    <div class=thumbnail-container>
      {@render children()}
    </div>
  </div>
{/if}

<style>
  .visualization-button {
    height: 300px;
    text-decoration: none;
    border: var(--border);
    border-color: transparent;

    /* Set flex properties */
    gap: 1em;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    /* The thumbnail could be anything, so the container div should set it's own size + hide overflow */
    .thumbnail-container {
      border-radius: 1em;
      height: 100%;
      overflow: hidden;

      /* Center the thumbnail just to be safe */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    /* Setup properties for transitions (link only) */
    &.is-link {
      transition-property: border-color, background-color;

      /* Interactive colours (hovering and when clicked) */
      &:hover {
        border-color: var(--col-highlight);
        background-color: var(--col-fg);
      }

      &:active {
        background-color: var(--col-highlight);
      }
    }
  }
</style>
