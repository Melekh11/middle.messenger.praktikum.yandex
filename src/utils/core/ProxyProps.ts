function ProxyProps(props: any) {
  return new Proxy(props, {
    get(target: Record<string, unknown>, prop: string) {
      if (prop.startsWith("_")) {
        throw new Error(`нет доступа к параметру ${prop}`);
      }
      const value = target[prop];
      return typeof value === "function" ? value.bind(target) : value;
    },

    set(target: object, prop: string, value: unknown) {
      if (prop.startsWith("_")) {
        throw new Error("Нет прав");
      }
      target[prop] = value;
      return true;
    },

    deleteProperty(target: object, prop: string) {
      if (prop.startsWith("_")) {
        throw new Error("Нет прав");
      }
      delete target[prop];
      return true;
    },
  });
}

export { ProxyProps as default };
