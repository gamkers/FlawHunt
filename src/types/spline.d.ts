declare namespace JSX {
  interface IntrinsicElements {
    'spline-viewer': {
      url: string;
      className?: string;
      style?: React.CSSProperties;
      'events-target'?: string;
      'mouse-controls'?: string | boolean;
      'render-mode'?: string;
      'pixel-ratio'?: string;
    };
  }
}

declare module '@splinetool/viewer' {
  export default class SplineViewer {
    constructor(canvas: HTMLCanvasElement);
    load(url: string): Promise<void>;
    dispose(): void;
  }
}