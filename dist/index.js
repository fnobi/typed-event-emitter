"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TypeRegi {
    constructor(state, actionCollection) {
        this.subscriptions = new Map();
        this.timer = null;
        this.lastId = 0;
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
        const id = this.lastId;
        this.lastId += 1;
        this.subscriptions.set(id, handler);
        // すでにsubscriptions実行のtimerがいるときはそれに任せる
        if (!this.timer) {
            this.fireTimer(() => {
                handler(this.state);
            });
        }
        return () => {
            this.subscriptions.delete(id);
        };
    }
    fireTimer(fn) {
        if (this.timer) {
            this.clearTimer();
        }
        this.timer = setTimeout(() => {
            fn();
            this.clearTimer();
        }, 0);
    }
    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = null;
    }
}
exports.default = TypeRegi;
//# sourceMappingURL=index.js.map