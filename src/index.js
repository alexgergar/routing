import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import draggedElementReducer, {
  initialDraggedElementState,
} from "./redux/reducers/draggedElement-reducer";
import itemsReducer from "./redux/reducers/item-reducer";
import widthHeightReducer, {
  initialWidthHeightState,
} from "./redux/reducers/widthHeight-reducer";
import menuReducer, { initialMenuState } from "./redux/reducers/menu-reducer";

const allReducers = combineReducers({
  draggedElement: draggedElementReducer,
  items: itemsReducer,
  widthHeight: widthHeightReducer,
  menu: menuReducer,
});

const store = createStore(
  allReducers,
  {
    draggedElement: initialDraggedElementState,
    items: null,
    widthHeight: initialWidthHeightState,
    menu: initialMenuState,
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // checks if dev tools exists and if it does calls it
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
