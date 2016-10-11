/*
 * 如何使用多个reducer
 */
import { createStore, combineReducers } from 'redux';
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
 * 将多个reducer组合成一个reducer
 */
let reducers = combineReducers({
    'number': numberReducer,
    'string': stringReducer
});

/*
 * 创建一个store实例, 注册刚才创建的组合reducer
 */
let store = createStore(reducers);
let dispatch = logDispatch(store);
logSubscribe(store);

/*
 * 派发各种action
 */
dispatch({'type': 'increment'});
dispatch({'type': 'increment'});
dispatch({'type': 'increment'});
