import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './inventory.css';
import Box from '../../common/Box';
import {connect} from "react-redux";
import axios from 'axios';

class InventorySummary extends Component {

    componentWillMount() {
    }

    componentDidMount() {
        this.props.fetchRecords();
    }

    rowGetter(i) {
        return this.props.tableDetail.rows[i];
    }

    render() {
        return <div className="page-section">
            <Box boxProp={this.props.boxProp}
                 tableDetail={this.props.tableDetail}
                 fetching={this.props.fetching}
                 error={this.props.error}
                 rowGetter={this.rowGetter.bind(this)}
                 formFields={this.props.formFields}
                 progress={{start: false, stop: false}}></Box>
            <Box boxProp={this.props.boxProp}
                 tableDetail={this.props.tableDetail}
                 fetching={this.props.fetching}
                 error={this.props.error}
                 rowGetter={this.rowGetter.bind(this)}
                 formFields={this.props.formFields}
                 progress={{start: false, stop: false}}></Box>
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        boxProp: state.InvSummary.boxProp,
        formFields: state.InvSummary.formFields,
        tableDetail: state.InvSummary.tableDetail,
        fetching: state.InvSummary.fetching,
        error: state.InvSummary.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchRecords: () => dispatch({
            type: 'FETCH_INVENTORY_SUMMARY',
            payload: axios.get("data.json")
        })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(InventorySummary);

