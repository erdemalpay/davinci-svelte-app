import type { SvelteComponent } from "svelte";
import type { RouteDefinition } from "svelte-spa-router";
import { mapValues } from 'lodash';
import { wrap } from 'svelte-spa-router/wrap';

import { user } from '../store';

function authCondition() {
  const isLoggedIn = !!user.getUserSync();

  return isLoggedIn;
}

export function addAuthGuard(routeDefinition: RouteDefinition): RouteDefinition {
	// adding auth condition to all route components except '/login'
  const routeDefs = mapValues(
    routeDefinition,
    (component: typeof SvelteComponent, routePath: string) => {
      if (routePath === '/login') {
        return component;
      }

      return wrap({
        component,
        conditions: [authCondition],
      });
    }
  );

  return routeDefs;
}