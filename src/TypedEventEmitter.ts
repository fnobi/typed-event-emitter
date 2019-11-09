type EventCollection<M> = { [type in keyof M]?: Array<(e: M[type]) => void> };

export default class TypedEventEmitter<M> {
    private collection: EventCollection<M> = {};

    on<K extends keyof M>(type: K, handler: (e: M[K]) => void): void {
        if (!this.collection[type]) this.collection[type] = [];
        this.collection[type].push(handler);
    }

    // TODO: offを書いてない

    emit<K extends keyof M>(type: K, payload: M[K]): void {
        if (!this.collection[type]) return;
        this.collection[type].forEach((handler) => {
            handler.call(this, payload);
        });
    }
}