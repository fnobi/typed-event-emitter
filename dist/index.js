"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TypeRegi {
    constructor(state, actionCollection) {
        this.subscriptions = [];
        this.timer = null;
        this.state = state;
        this.actionCollection = actionCollection;
    }
    dispatch(type, payload) {
        const reducer = this.actionCollection[type];
        if (!reducer) {
            return;
        }
        const newState = reducer(this.state, payload);
        this.state = newState;
        this.fireTimer(() => {
            this.subscriptions.forEach(handler => handler(this.state));
        });
    }
    getState() {
        return this.state;
    }
    subscribe(handler) {
        this.subscriptions.push(handler);
        // すでにsubscriptions実行のtimerがいるときはそれに任せる
        if (!this.timer) {
            this.fireTimer(() => {
                handler(this.state);
            });
        }
        return () => {
            const index = this.subscriptions.findIndex(h => h === handler);
            this.subscriptions = [
                ...this.subscriptions.slice(0, index),
                ...this.subscriptions.slice(index + 1)
            ];
        };
    }
    fireTimer(fn) {
        if (this.timer) {
            this.clearTimer();
        }
        this.timer = setImmediate(() => {
            fn();
            this.clearTimer();
        });
    }
    clearTimer() {
        if (this.timer) {
            clearImmediate(this.timer);
        }
        this.timer = null;
    }
}
exports.default = TypeRegi;
//# sourceMappingURL=index.js.map