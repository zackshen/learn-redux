let logDispatch = (store) => (action) => {
    console.log(">>>>>> Dispatch Action Start <<<<<");
    store.dispatch(action);
    console.log(">>>>>> Dispatch Action End <<<<<");
};

export default logDispatch;
