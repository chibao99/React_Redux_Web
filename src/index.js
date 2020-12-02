import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import appReducer from "./reducers/index";
import thunk from "redux-thunk";
import "react-toastify/dist/ReactToastify.css";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = createStore(appReducer, composeEnhancer(applyMiddleware(thunk)));
ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById("root")
);
