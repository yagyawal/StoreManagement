import {First, Second, Third} from '../containers';

const defaultState = {
    sidebarCollapsed: true,
    menuItems: [{
        id: 1,
        desc: 'First Menu Item',
        icon: 'fa fa-search',
        show: true,
        url: '/first',
        component: First
    },
        {
            id: 2,
            desc: 'Second Menu Item',
            icon: 'fa fa-users',
            show: true,
            url: '/second',
            component: Second
        },
        {
            id: 3,
            desc: 'Third Menu Item',
            icon: 'fa fa-sitemap',
            show: true,
            url: '/third',
            component: Third
        }]
}
const todos = (state = defaultState, action) => {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            return Object.assign({}, state, {sidebarCollapsed: !state.sidebarCollapsed});
        default:
            return state
    }
}

export default todos