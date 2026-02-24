import type { DefineComponent } from 'vue';

export interface ToolcallComponentProps<TArgs extends object = any, TResult = any, TResponse = any> {
  status: 'idle' | 'executing' | 'complete' | 'error';
  args: TArgs;
  result?: TResult;
  error?: Error;
  respond?: (response: TResponse) => void;
  agentState?: Record<string, any>;
}

interface NonInteractiveToolcallConfig<TArgs extends object, TResult> {
  name: string;
  description?: string;
  parameters?: Array<{ name: string; type: string; required?: boolean }>;
  handler: (args: TArgs, backendResult?: any) => Promise<TResult>;
  component: DefineComponent<ToolcallComponentProps<TArgs, TResult>>;
  subscribeKey?: (props: ToolcallComponentProps<TArgs, TResult>) => string | undefined;
}

interface InteractiveToolcallConfig<TArgs extends object, TResult, TResponse> {
  name: string;
  description: string;
  parameters?: Array<{ name: string; type: string; required?: boolean }>;
  component: DefineComponent<ToolcallComponentProps<TArgs, TResult, TResponse>>;
  handler?: never;
  subscribeKey?: (props: ToolcallComponentProps<TArgs, TResult>) => string | undefined;
}

export type AgentToolcallConfig<TArgs extends object = any, TResult = any, TResponse = any> =
  | NonInteractiveToolcallConfig<TArgs, TResult>
  | InteractiveToolcallConfig<TArgs, TResult, TResponse>;

export function isNonInteractive<TArgs extends object, TResult>(
  config: AgentToolcallConfig<TArgs, TResult, any>,
): config is NonInteractiveToolcallConfig<TArgs, TResult> {
  return typeof (config as any).handler === 'function';
}

export interface AgentToolcallRegistry {
  [ToolcallName: string]: AgentToolcallConfig;
}

export interface AgentToolcallState<TArgs extends object = any, TResult = any> {
  status: ToolcallComponentProps['status'];
  args?: TArgs;
  result?: TResult;
  error?: Error;
}

export const isNonInteractiveConfig = (cfg: AgentToolcallConfig): cfg is AgentToolcallConfig & { handler: Function } =>
  typeof (cfg as any).handler === 'function';
