import { Buffer } from "buffer";

declare global {
  interface Window {
    global: typeof globalThis;
    Buffer: typeof Buffer;
  }
}

window.global = window;
window.Buffer = Buffer;
