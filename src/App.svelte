<script lang="ts">
  import { onMount } from 'svelte';

  import Router from 'svelte-spa-router';
  import NavigationBar from './components/NavigationBar.svelte';
  import Resolver from './lib/resolver';
  import { routes, onRouteConditionsFailed } from './router';

  let resolving = true;

  onMount(async () => {
    await Resolver.resolve();
    resolving = false;
  });
</script>

{#if !resolving}
  <main class="h-screen flex flex-col">
    <NavigationBar />
    <Router {routes} on:conditionsFailed={onRouteConditionsFailed} />
  </main>
{/if}

<style>
</style>
