<script lang="ts">
  import VisualizationPageTemplate from "../VisualizationPage.svelte";
</script>

<VisualizationPageTemplate title="Newton's Method">
  {#snippet explanation()}
    Hello
  {/snippet}

  {#snippet visualization()}
    Vis
  {/snippet}
</VisualizationPageTemplate>
