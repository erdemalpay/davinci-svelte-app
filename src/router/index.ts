import type { RouteDefinition } from 'svelte-spa-router';
import { replace } from 'svelte-spa-router';
import Login from '../components/pages/Login.svelte';
import Home from '../components/pages/Home.svelte';
import NotFound from '../components/pages/NotFound.svelte';
import { addAuthGuard } from './router.helpers';

export const routes: RouteDefinition = addAuthGuard({
  '/login': Login,
  '/': Home,
  '*': NotFound,
});

export function onRouteConditionsFailed() {
  replace('/login');
}
