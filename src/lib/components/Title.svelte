<script lang="ts">
  // This component is an easy way to set the page title without prefixing it with "Phobos - "

  interface Props {
    title: string;
  }

  let { title }: Props = $props();
</script>

<svelte:head>
  <title>Phobos - {title}</title>
</svelte:head>
