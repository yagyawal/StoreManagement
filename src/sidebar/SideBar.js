import React, {Component} from 'react';
import '../App.css';
import 'font-awesome/css/font-awesome.min.css';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: [
                {
                    id: 1,
                    desc: 'First Menu Item',
                    icon: 'fa fa-search',
                    show: true
                },
                {
                    id: 2,
                    desc: 'Second Menu Item',
                    icon: 'fa fa-users',
                    show: true
                },
                {
                    id: 3,
                    desc: 'Third Menu Item',
                    icon: 'fa fa-sitemap',
                    show: true
                },
            ],
            searchTerm: "Hello"
        }
    }

    searchChanged(event) {
        console.log("search changed to ", event.target.value);
        this.setState({
            menuItems: this.state.menuItems.map(item => {
                let temp=Object.assign({}, item);
                temp.show=(item.desc.toLocaleLowerCase().indexOf(event.target.value.toLowerCase()) >= 0);
                console.log("changed ",temp);
                return temp;
            })
        });

    };

    render() {
        return <div className="sidebar">
            <input type="text" onChange={this.searchChanged.bind(this)}></input>
            <span className="fa fa-search searchspan"></span>
            <Menu menuItems={this.state.menuItems}></Menu>
        </div>;
    }
}

class Menu extends Component {

    render() {
        let menuItems = this.props.menuItems
            .filter(item => item.show)
            .map(item => {
                return <MenuItem desc={item.desc} icon={item.icon} key={item.id}></MenuItem>
            });
        return <ul className="menu">
            {menuItems}
        </ul>
    }
}

class MenuItem extends Component {
    render() {
        return <li>
            <span className={this.props.icon}></span>
            {this.props.desc}
        </li>;
    }
}

export default SideBar;