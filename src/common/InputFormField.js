import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './box.css';

class InputFormField extends Component{
    render(){
        return <div className="form-field">
            <label>{this.props.label}</label>
            <input type={this.props.type} id={this.props.id} name={this.props.name}/>
        </div>
    }
}

export default InputFormField;