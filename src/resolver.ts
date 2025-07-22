type Constructor<T = any> = new (...args: any[]) => T;
export const resolver = <T>(cl: Constructor<T>) => new cl();
