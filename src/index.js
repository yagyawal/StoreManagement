import './index.css';
// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();

import React from 'react';
import {render} from 'react-dom'
import {applyMiddleware, createStore} from 'redux'
import todoApp from './reducers'
import Root from './Root'
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

const middleware = applyMiddleware(promise(),thunk, createLogger());
let store = createStore(todoApp, middleware);
Number.prototype.format = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};


render(
    <Root store={store}/>,
    document.getElementById('root')
)