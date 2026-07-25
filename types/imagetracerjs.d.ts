declare module 'imagetracerjs' {
  const ImageTracer: {
    imageToSVG: (url: string, options?: Record<string, unknown>) => string;
  };
  export default ImageTracer;
}
