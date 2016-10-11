/*
 * 最简单的redux编程模型
 */
import { createStore } from 'redux';
import { logDispatch, logSubscribe } from './utils';

/*
 * 创建一个数字加减的reducer
 */
function numberReducer(state = 0, action) {
    let v = state;
    if (action.type === 'increment') {
        v += 1;
    } else if (action.type == 'decrement') {
        v -= 1;
    }

    return v;
}

/*
 * 创建一个store实例
 */
let store = createStore(numberReducer);
let dispatch = logDispatch(store);
logSubscribe(store);

/*
 * 派发各种action
 */
dispatch({'type': 'increment'});
dispatch({'type': 'increment'});
dispatch({'type': 'increment'});
