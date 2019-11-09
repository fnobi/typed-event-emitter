declare type ActionCollection<S, A> = {
    [type in keyof A]: (state: S, e: A[type]) => S;
};
export default class TypeRegi<S, A> {
    private state;
    private actionCollection;
    private subscriptions;
    private timer;
    constructor(state: S, actionCollection: ActionCollection<S, A>);
    dispatch<K extends keyof A>(type: K, payload: A[K]): void;
    getState(): S;
    subscribe(handler: (state: S) => void): () => void;
    private fireTimer;
    private clearTimer;
}
export {};
