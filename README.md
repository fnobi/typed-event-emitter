type-regi
----

simple event store for react/typescript.

[![CircleCI](https://circleci.com/gh/fnobi/type-regi/tree/master.svg?style=svg)](https://circleci.com/gh/fnobi/type-regi/tree/master)

```ts
type SampleState = {
    count: number;
};
type SampleActions = {
    increment: {
        value: number;
    };
};
const defaultState: SampleState = {
    count: 0
};
const actions = {
    increment(state: SampleState, payload: { value: number }) {
        const { value } = payload;
        return {
            count: state.count + value
        };
    }
};

const store = new TypeRegi<SampleState, SampleActions>(defaultState, actions);

store.subscribe((state: SampleState) => {
    console.log('count is ${state.count}.');
});

store.dispatch('increment', { value: 1 });
// => "count is 1"
```