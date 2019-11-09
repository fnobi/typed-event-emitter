import TypeRegi from '../src/';

describe('TypeRegi instance', () => {
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
    
    it('getState return default state.', () => {
        const store = new TypeRegi<SampleState, SampleActions>(defaultState, actions);
        expect(store.getState()).toBe(defaultState);
    });

    it('update state with action', () => {
        return new Promise((resolve) => {
            const store = new TypeRegi<SampleState, SampleActions>(defaultState, actions);
            store.dispatch('increment', { value: 1 });
            const unsubscribe = store.subscribe((state: SampleState) => {
                expect(state.count).toBe(1);
                unsubscribe();
                resolve();
            });
        });
    });
    
    it('fire subscription only 1 time', () => {
        return new Promise((resolve) => {
            const store = new TypeRegi<SampleState, SampleActions>(defaultState, actions);
            store.dispatch('increment', { value: 1 });
            store.dispatch('increment', { value: 1 });
            store.dispatch('increment', { value: 1 });
            store.dispatch('increment', { value: 1 });
            const unsubscribe = store.subscribe((state: SampleState) => {
                expect(state.count).toBe(5);
                unsubscribe();
                resolve();
            });
        });
    });
});