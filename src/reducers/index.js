import { combineReducers } from 'redux'
import menus from './menus'
import InvSummary from './InvSummary';

const todoApp = combineReducers({
    menus,
    InvSummary
})

export default todoApp