import { Plugin, Component, Directive } from 'vue';

export function withInstall<T>(
  comp: T,
  alias?: string,
  directive?: { name: string; comp: Directive<T & Plugin> },
): T & Plugin {
  const componentPlugin = comp as T & Component & Plugin;

  componentPlugin.install = (app: any, name?: string) => {
    const componentName = alias || name || componentPlugin.name;
    if (typeof componentName === 'string') {
      app.component(componentName, comp);
    } else {
      app.component(componentPlugin.name, comp);
    }
    directive && app.directive && app.directive(directive.name, directive.comp);
  };

  return componentPlugin as T & Plugin;
}
