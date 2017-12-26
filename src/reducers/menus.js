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
const menus = (state = defaultState, action) => {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            return Object.assign({}, state, {
                sidebarCollapsed: !state.sidebarCollapsed
            });
        case 'MENU_SEARCH':
            var newItems = state.menuItems.map(function (item) {
                return Object.assign({}, item, {show: item.desc.toLowerCase().indexOf(action.payload) >= 0})
            });
            return Object.assign({}, state, {menuItems: newItems});
        default:
            return state;
    }
}

export default menus