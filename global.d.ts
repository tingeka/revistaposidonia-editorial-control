// global.d.ts
export {};

declare global {
  interface Window {
    wp: any;
    wpApiSettings: { nonce: string };
  }
}