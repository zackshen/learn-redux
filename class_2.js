/*
 * 如何使用多个reducer
 */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logDispatch, logSubscribe } from './utils';

function numberReducer(state = 1, action) {
    let v = state;
    if (action.type === 'increment') {
        v += 1;
    } else if (action.type == 'decrement') {
        v -= 1;
    }

    return v
}

function stringReducer(state = 'hello', action) {
    let v = action.string || state;
    if (action.type === "lower") {
        v = v.toLowerCase();
    } else if (action.type === "upper") {
        v = v.toUpperCase();
    }
    return v;
}

let reducers = combineReducers({
    'number': numberReducer,
    'string': stringReducer
});

let store = createStore(reducers);
let dispatch = logDispatch(store);
logSubscribe(store);

dispatch({'type': 'increment'});
dispatch({'type': 'increment'});
dispatch({'type': 'increment'});
