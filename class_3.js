/*
 * 如何形成一颗状态树
 */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logDispatch, logSubscribe } from './utils';

/*
 * 控制数字变化的reducder
 */
function numberReducer(state = 1, action) {
    let v = state;
    if (action.type === 'increment') {
        v += 1;
    } else if (action.type == 'decrement') {
        v -= 1;
    }

    return v
}

/*
 * 控制字符串大小写的reducer
 */
function stringReducer(state = 'hello', action) {
    let v = action.string || state;
    if (action.type === "lower") {
        v = v.toLowerCase();
    } else if (action.type === "upper") {
        v = v.toUpperCase();
    }
    return v;
}

/*
 * 起名为rootSliceReducer是为了和下面的childReducers区分开来
 * 好辨别, 可以不那么取名字的
 */
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

/*
 * 将number和string的reducer组合起来
 */
let childReducers = combineReducers({
    'number': numberReducer,
    'string': stringReducer
});

/*
 * 将slice的reducer和上面的childReducer组合起来
 * 这样就形成了一颗想象中的状态树
 */
let reducers = combineReducers({
    'root': rootSliceReducer,
    'child': childReducers
});

/*
 * 还是将reducer注册到store中
 */
let store = createStore(reducers);
let dispatch = logDispatch(store);
logSubscribe(store);

dispatch({'type': 'increment'});
dispatch({'type': 'increment'});
dispatch({'type': 'increment'});
dispatch({'type': 'upper'});
dispatch({'type': 'upper', 'string': 'abc'});
