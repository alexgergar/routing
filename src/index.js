import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from './serviceWorker';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux'
import productsReducer from './reducers/product-reducer'
import userReducer from './reducers/user-reducer'

const allReducers = combineReducers({
  products: productsReducer,
  user: userReducer,
})

const store = createStore(
  allReducers, 
  {
    products: [{ name: 'iPhone'}],
    user: 'Alex'
  }, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // checks if dev tools exists and if it does calls it
);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
