import React, {Component} from 'react';
import {connect} from "react-redux";
import '../App.css';
import 'font-awesome/css/font-awesome.min.css';
import {
    Link
} from 'react-router-dom';


class SideBar extends Component {
    searchChanged(event) {
        this.setState({
            menuItems: this.props.menuItems.map(item => {
                let temp = Object.assign({}, item);
                temp.show = (item.desc.toLocaleLowerCase().indexOf(event.target.value.toLowerCase()) >= 0);
                return temp;
            })
        });

    };
    componentWillMount(){
        console.log("Component will mount ",this.props);
    }

    render() {
        return <div className={(this.props.sidebarCollapsed ? "sidebar-collapse" : "sidebar")} onMouseEnter={this.props.toggleSidebar} onMouseLeave={this.props.toggleSidebar}>
            <input type="text" autoFocus="true" onChange={this.searchChanged.bind(this)}></input>
            <span className="fa fa-search searchspan"></span>
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
        toggleSidebar : () => dispatch({
            type : 'TOGGLE_SIDEBAR'
        })
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(SideBar);