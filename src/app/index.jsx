import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import ReduxPromise from 'redux-promise';

import reducers from './reducers';
import routes from './routes';

import 'bulma/css/bulma.css'

// for bundling your styles
import './bundle.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = composeEnhancers(applyMiddleware(ReduxPromise))(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={browserHistory} routes={routes} />
    </Provider>
  , document.querySelector('.react-root'));
