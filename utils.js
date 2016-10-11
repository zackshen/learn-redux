let logDispatch = (store) => (action) => {
    console.log(">>>>>> Dispatch Action Start <<<<<");
    store.dispatch(action);
    console.log(">>>>>> Dispatch Action End <<<<<");
};

let logSubscribe = (store) => {
    /*
     * 监听状态变化
     */
    store.subscribe(() => {
        console.log("===== New State =====");
        console.log(store.getState());
    });
};

export { logDispatch, logSubscribe };
