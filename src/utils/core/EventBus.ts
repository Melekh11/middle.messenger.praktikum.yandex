export default class EventBus {

    // подскажите как сделать так, чтобы listeners был объектом, который по ключу string содержит array функций
    protected listeners: object;

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: Function): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off(event: string, callback: Function): void {
        if (!this.listeners[event]) {
            throw new Error(`события ${event} не существует`)
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit(event: string, ...args) {
        if (!this.listeners[event]) {
            throw new Error(`события ${event} не существует`)
        }

        this.listeners[event].forEach(function(listener) {
            listener(...args);
        });
    }
}