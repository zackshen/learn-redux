import { createStore, combineReducers, applyMiddleware } from 'redux';

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

function rootSliceReducer(state = 'redux', action) {
    let { size, str } = action;
    size = size || 2;
    str = str || state;

    if (action.type === 'left') {
        return str.slice(0, size);
    } else if (action.type == 'right') {
        return str.slice(str.length - size, str.length);
    }
    return str;
}

let childReducers = combineReducers({
    'number': numberReducer,
    'string': stringReducer
});

let reducers = combineReducers({
    'root': rootSliceReducer,
    'child': childReducers
});

function logMiddleware() {
    return () => next => action => {
        console.log('---before', action);
        next(action);
        console.log('---after', action);
    };
}

let store = createStore(reducers, applyMiddleware(logMiddleware()));

store.subscribe(() => {console.log(store.getState())});

store.dispatch({'type': 'increment'});
store.dispatch({'type': 'increment'});
store.dispatch({'type': 'increment'});
store.dispatch({'type': 'upper'});
store.dispatch({'type': 'upper', 'string': 'abc'});
