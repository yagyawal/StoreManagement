import './index.css';
// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();

import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux'
import todoApp from './reducers'
import Root from './Root'

let store = createStore(todoApp)

render(
    <Root store={store} />,
    document.getElementById('root')
)