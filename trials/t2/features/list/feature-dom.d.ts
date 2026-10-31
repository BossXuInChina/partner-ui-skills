import 'vue';

declare module 'vue' {
  interface HTMLAttributes {
    [key: `data-${string}`]: string | number | boolean | undefined;
  }
}
