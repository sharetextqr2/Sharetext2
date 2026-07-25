declare module 'tesseract.js' {
  interface CreateWorkerOptions {
    lang?: string;
    [key: string]: unknown;
  }
  interface RecognizeResult {
    data: { text: string };
  }
  interface Worker {
    recognize: (image: File | Blob | string) => Promise<RecognizeResult>;
    terminate: () => Promise<void>;
  }
  export function createWorker(lang?: string, options?: CreateWorkerOptions): Promise<Worker>;
}
