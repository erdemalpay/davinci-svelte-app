export function ApiResource(resourcePath: string) {
  return function <T extends { new (...args: any[]) }>(constructor: T) {
    return class extends constructor {
      resourcePath = resourcePath;

      constructor(...args: any[]) {
        super(resourcePath);
      }
    };
  };
}
