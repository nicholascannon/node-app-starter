type ListenerFunction = () => Promise<unknown>;
let running = true;
const onCloseListeners: Array<ListenerFunction> = [];

export const lifecycle = {
  isRunning: () => running,
  on: (_: 'close', listener: ListenerFunction) => onCloseListeners.push(listener),
  shutdown: async () => {
    if (running) {
      running = false;
      await Promise.all(onCloseListeners.map((listener) => listener()));
    }
  },
};
