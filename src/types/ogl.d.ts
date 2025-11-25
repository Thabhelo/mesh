declare module 'ogl' {
  export class Renderer {
    constructor(options?: any);
    gl: WebGLRenderingContext & { canvas: HTMLCanvasElement };
    setSize(width: number, height: number): void;
  }

  export class Program {
    constructor(gl: WebGLRenderingContext, options: any);
    uniforms: any;
  }

  export class Mesh {
    constructor(gl: WebGLRenderingContext, options: any);
  }

  export class Triangle {
    constructor(gl: WebGLRenderingContext);
  }

  export class Vec3 {
    constructor(x?: number, y?: number, z?: number);
    set(x: number, y: number, z: number): void;
  }
}


