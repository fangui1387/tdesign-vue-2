import { MessagePlugin } from 'tdesign-vue';

export * from './hooks';

export class MessagePluginSingleton {
  private static instance: MessagePluginSingleton;
  private messagePlugin: any;

  private constructor() {
    this.messagePlugin = null;
  }

  public static getInstance(): MessagePluginSingleton {
    if (!MessagePluginSingleton.instance) {
      MessagePluginSingleton.instance = new MessagePluginSingleton();
    }
    return MessagePluginSingleton.instance;
  }

  public showSuccess(copyTextSuccess: string): void {
    if (this.messagePlugin) {
      MessagePlugin.closeAll();
    }
    this.messagePlugin = MessagePlugin.success(copyTextSuccess, 1000);
  }
  public showError(copyTextFail: string): void {
    if (this.messagePlugin) {
      MessagePlugin.closeAll();
    }
    this.messagePlugin = MessagePlugin.error(copyTextFail, 1000);
  }
}
