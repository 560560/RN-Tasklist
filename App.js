import React, {useState} from 'react';
import Main from "./src/main";
import {Provider} from "react-redux";
import store from "./src/redux/redux-store";


const App = () => {

    return (
        <Provider store={store}>
            <Main/>
        </Provider>
    );
}

export default App
