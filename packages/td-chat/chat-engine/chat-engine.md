:: BASE_DOC ::

## API

### ChatEngine Hooks

#### useChat

聊天引擎核心 Hook，用于管理聊天状态和消息流。

**参数：**
```typescript
interface UseChatOptions {
  defaultMessages?: ChatMessagesData[];
  chatServiceConfig?: ChatServiceConfig;
}
```

**返回值：**
```typescript
{
  chatEngine: Ref<ChatEngineInstance | null>;
  messages: Ref<ChatMessagesData[]>;
  status: Ref<'idle' | 'pending' | 'streaming' | 'complete' | 'error'>;
}
```

#### useAgentState

Agent 状态管理 Hook。

#### useAgentToolcall

Agent 工具调用 Hook。

### ChatEngine Types

```typescript
interface ChatServiceConfig {
  endpoint: string;
  protocol?: 'sse' | 'agui';
  stream?: boolean;
  onStart?: (chunk: any) => void;
  onComplete?: (aborted: boolean, params: RequestInit, event?: any) => void;
  onError?: (err: Error | Response) => void;
  onAbort?: () => void;
  onRequest?: (innerParams: ChatRequestParams) => RequestInit;
}

interface ChatRequestParams {
  prompt: string;
  messages?: ChatMessagesData[];
}

interface ChatMessagesData {
  id?: string;
  role: 'user' | 'assistant' | 'system';
  content: string | ChatMessageContent[];
  datetime?: string;
  avatar?: string;
  name?: string;
  status?: 'pending' | 'streaming' | 'complete' | 'error';
}
```
