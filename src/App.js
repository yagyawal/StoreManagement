import React, { Component } from 'react';
import  SideBar from './sidebar/SideBar';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="wrapper">
             <SideBar></SideBar>
              <Header></Header>
              <MainPage></MainPage>
          </div>
      </div>
    );
  }
}

class Header extends Component{
    render(){
        return <div className="header">
           Welcome to Store Management  Application!
        </div>
    }
}



class MainPage extends Component{
    render(){
        return <div className="contentSection">This is Main page <p>paragraph 1 is started</p></div>;
    }
}

export default App;
