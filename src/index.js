import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import draggedElementReducer from "./reducers/draggedElement-reducer";
import itemsReducer from "./reducers/item-reducer";
import { testData } from "./utils/testData";

const allReducers = combineReducers({
  draggedElement: draggedElementReducer,
  items: itemsReducer,
});

const initialDraggedElementState = {
  areaOfClickedElement: null,
  positionOfMouseDown: null,
  coordsOfDroppedElement: null,
  currentItem: null,
  dragOverDropTargetID: null,
  dragOverArea: null,
};

const store = createStore(
  allReducers,
  {
    draggedElement: initialDraggedElementState,
    items: testData,
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
