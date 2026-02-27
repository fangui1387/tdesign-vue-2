export class MockSSEResponse {
  private controller!: ReadableStreamDefaultController<Uint8Array>;
  private encoder = new TextEncoder();
  private stream: ReadableStream<Uint8Array>;
  private error: boolean;

  constructor(
    private data: string,
    private delay: number = 300,
    error = false,
  ) {
    this.error = error;

    this.stream = new ReadableStream({
      start: (controller) => {
        this.controller = controller;
        if (!this.error) {
          setTimeout(() => this.pushData(), this.delay);
        }
      },
      cancel() {},
    });
  }

  private pushData() {
    if (this.data.length === 0) {
      this.controller.close();
      return;
    }
    try {
      const chunk = this.data.slice(0, 1);
      this.data = this.data.slice(1);

      this.controller.enqueue(this.encoder.encode(chunk));

      if (this.data.length > 0) {
        setTimeout(() => this.pushData(), this.delay);
      } else {
        setTimeout(() => this.controller.close(), this.delay);
      }
    } catch {}
  }

  getResponse(): Promise<Response> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (this.error) {
          const errorResponseOptions = { status: 500, statusText: 'Internal Server Error' };
          resolve(new Response(null, errorResponseOptions));
        } else {
          resolve(new Response(this.stream));
        }
      }, this.delay);
    });
  }
}
