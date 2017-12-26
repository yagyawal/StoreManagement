import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './inventory.css';
import Box from '../../common/Box';
import {connect} from "react-redux";

class InventorySummary extends Component {
    componentWillMount() {
        console.log("Current state properties ", this.props);
    }

    render() {
        return <Box boxProp={this.props.boxProp} formFields={this.props.formFields}
                    progress={{start: false, stop: false}}></Box>;
    }
}

const mapStateToProps = state => {
    return {
        boxProp: state.InvSummary.boxProp,
        formFields: state.InvSummary.formFields
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchMenu: () => dispatch({
            type: 'FETCH_MENU'
        })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(InventorySummary);

