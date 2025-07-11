<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    title: string,
    link: string,
    children: Snippet // Thumnail
  }

  let {
    title,
    link,
    children
  }: Props = $props();
</script>

<a class="mg visualization-button" href={link}>
  <div class=thumbnail>
    {@render children()}
  </div>

  <h3>{title}</h3>
</a>

<style>
  .visualization-button {
    gap: 1em;
    height: 300px;
    text-decoration: none;
    border: var(--border);

    display: flex;
    flex-direction: column;
    align-items: stretch;

    .thumbnail {
      border-radius: 1em;
      height: 100%;
      overflow: hidden;

      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    border-color: transparent;
    transition-property: border-color, background-color;

    &:hover {
      border-color: var(--col-highlight);
      background-color: var(--col-fg);
    }

    &:active {
      background-color: var(--col-highlight);
    }
  }
</style>
