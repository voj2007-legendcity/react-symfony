import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// Reducers
import SettingsReducer from './store/reducers/settings';
import FormReducer from './store/reducers/form';
import BlockReducer from './store/reducers/block';
import PageReducer from './store/reducers/page';
import ProductReducer from './store/reducers/product';
import CartReducer from './store/reducers/cart';
// Components
import Main from './components/Main';
// Styles
import classes from '../css/App.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  settings: SettingsReducer,
  form: FormReducer,
  block: BlockReducer,
  product: ProductReducer,
  page: PageReducer,
  cart: CartReducer
});
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));
const app = (
  <div className={classes.App}>
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  </div>
);
ReactDOM.render(app, document.getElementById('root'));
