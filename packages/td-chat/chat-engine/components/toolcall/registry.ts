import type { Component } from 'vue';
import { defineComponent, h } from 'vue';
import type { AgentToolcallConfig, AgentToolcallRegistry } from './types';

class AgentToolcallRegistryManager {
  private registry: AgentToolcallRegistry = {};

  private renderFunctionCache = new Map<string, Component>();

  register<TArgs extends object = any, TResult = any, TResponse = any>(
    config: AgentToolcallConfig<TArgs, TResult, TResponse>,
  ): void {
    const existingConfig = this.registry[config.name];

    if (existingConfig && (existingConfig as any).component !== config.component) {
      this.renderFunctionCache.delete(config.name);
    }
    this.registry[config.name] = config;
    window.dispatchEvent(
      new CustomEvent('toolcall-registered', {
        detail: { name: config.name },
      }),
    );
  }

  get(name: string): AgentToolcallConfig | undefined {
    return this.registry[name];
  }

  getRenderFunction(name: string): Component | null {
    const config = this.registry[name];
    if (!config) return null;

    let memoizedComponent = this.renderFunctionCache.get(name);

    if (!memoizedComponent) {
      memoizedComponent = defineComponent({
        name: `Memoized${name}`,
        props: {
          status: String,
          args: Object,
          result: [Object, String, Number, Boolean],
          error: Object,
          respond: Function,
          agentState: Object,
        },
        setup(props) {
          return () => h(config.component as Component, props);
        },
      });

      this.renderFunctionCache.set(name, memoizedComponent);
    }

    return memoizedComponent;
  }

  getAll(): AgentToolcallRegistry {
    return { ...this.registry };
  }

  unregister(name: string): void {
    delete this.registry[name];
    this.renderFunctionCache.delete(name);
  }

  clear(): void {
    this.registry = {};
    this.renderFunctionCache.clear();
  }
}

export const agentToolcallRegistry = new AgentToolcallRegistryManager();
