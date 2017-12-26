import React, {Component} from 'react';
import {connect} from "react-redux";
import '../App.css';
import 'font-awesome/css/font-awesome.min.css';
import {
    Link
} from 'react-router-dom';


class SearchBox extends Component {
    render() {
        return (
            <div>
                <form>
                    <input type="search" style={{
                        width: "100%",
                    }} onKeyUp={this.props.searchChanged}/>
                </form>
            </div>
        );
    }
}


class SideBar extends Component {
    searchChanged(event) {
        this.props.searchMenu(event.target.value.toLowerCase());
    };

    render() {
        return <div className={(this.props.sidebarCollapsed ? "sidebar-collapse" : "sidebar")}
                    onMouseEnter={this.props.toggleSidebar} onMouseLeave={this.props.toggleSidebar}>
            <SearchBox searchChanged={this.searchChanged.bind(this)}></SearchBox>
            <Menu menuItems={this.props.menuItems}></Menu>
        </div>;
    }
}

class Menu extends Component {
    render() {
        let menuItems = this.props.menuItems
            .filter(item => item.show)
            .map(item => {
                return <MenuItem desc={item.desc} icon={item.icon} key={item.id} url={item.url}></MenuItem>
            });
        return <div>
            <ul className="menu">
                {menuItems}
            </ul>
        </div>
    }
}

class MenuItem extends Component {
    render() {
        return <li>
            <span className={this.props.icon}></span>
            <Link to={this.props.url}>{this.props.desc}</Link>
        </li>;
    }
}

const mapStateToProps = state => {
    return {
        menuItems: state.menus.menuItems,
        sidebarCollapsed: state.menus.sidebarCollapsed
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchMenu: (term) => dispatch({
            type: 'MENU_SEARCH',
            payload: term
        }),
        toggleSidebar: (item) => dispatch({
            type: 'TOGGLE_SIDEBAR'
        })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SideBar);