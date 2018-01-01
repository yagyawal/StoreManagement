import React, {Component} from 'react';
import SideBar from './sidebar/SideBar';
import {connect} from "react-redux";
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import {
    Route,
    Switch
} from 'react-router-dom';



class App extends Component {

    componentWillMount(){
    }

    render() {
        return (
            <div className="App">
                <div className="wrapper">
                    <SideBar menuItems={this.props.menuItems}></SideBar>
                    <Header></Header>
                    <MainPage menuItems={this.props.menuItems} sidebarCollapsed={this.props.sidebarCollapsed}></MainPage>
                </div>
            </div>
        );
    }
}

class Header extends Component {
    render() {
        return <div className="header">
            Welcome to Store Management Application!
        </div>
    }
}


class MainPage extends Component {
    render() {
        let routs = this.props.menuItems.map(item => {
            return <Route exact path={item.url} component={item.component} key={item.id}/>
        });
        return <div className={(this.props.sidebarCollapsed?"contentSection-expended":"contentSection")}  id="pageContent">
            <Switch>
                {routs}
            </Switch>
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        menuItems : state.menus.menuItems,
        sidebarCollapsed:state.menus.sidebarCollapsed
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleSidebar : () => dispatch({
            type : 'TOGGLE_SIDEBAR'
        })
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
