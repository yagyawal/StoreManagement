import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './box.css';
import InputFormField from './InputFormField';
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import {Table, Column, Cell} from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import {DateCell, LinkCell, ColoredTextCell, TextCell, NumberCell} from './dataTable/cells';


class BoxTool extends Component {
    render() {
        return <span onClick={this.props.clickHandler}
                     className={"fa " + this.props.icon + " fa-lg"}
                     style={{display: (this.props.hidden ? 'none' : 'inline'), color: "grey"}}></span>
    }
}

// Table data as a list of array.
const rows = [
    "first row",
    "second row",
    "third row"
];


class Box extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boxProp: {
                title: this.props.boxProp.title || "Title",
                minimizeTool: this.props.boxProp.minimizeTool || true,
                closeTool: this.props.boxProp.closeTool || true,
                minimized: this.props.boxProp.minimized || false,
                closed: this.props.boxProp.closed || false
            },
            timer: null,
            progress: {
                start: this.props.progress.start || false,
                stop: this.props.progress.stop || false,
                completed: 0
            }
        }
    }


    startProcessing() {
        this.setState(Object.assign({}, this.state, {submitted: true}));
        var timer = setInterval(() => {
            var currVal = this.state.progress.completed + 1;
            var arrow = ">";
            if (currVal >= 15 && currVal <= 20) {
                arrow = "=>";
            } else if (currVal > 20 && currVal <= 28) {
                arrow = "==>";
            } else if (currVal > 28) {
                arrow = ">==>";
            }
            this.setState({arrow: arrow, progress: Object.assign({}, this.state.progress, {completed: currVal % 100})});
        }, 20);
        console.log("timer ", timer);
        this.setState({timer: timer});
        console.log("process started");
    }

    endProcessing() {
        console.log("ending process")
        if (this.state.timer) {
            console.log("DDDDDDDFSAD", this.state.timer);
            clearInterval(this.state.timer);
            this.setState({timer: null});
        }
    }


    mimimize(state) {
        return {boxProp: Object.assign({}, state.boxProp, {minimized: true})};
    }

    maximize(state) {
        return {boxProp: Object.assign({}, state.boxProp, {minimized: false})};
    }

    minimizeIconCLickHandler() {
        this.setState(this.mimimize);
    }

    maximizeIconCLickHandler() {
        this.setState(this.maximize);
    }

    closeIconClickHandler() {

    }


    createForm() {
        return this.props.formFields.map(field => {
            return <InputFormField key={field.id} id={field.id} name={field.name} type={field.type}
                                   label={field.label}></InputFormField>;
        });
    }

    getColumns() {
        const {columns} = this.props.tableDetail;
        return columns.map(column => {
            var cell = null;
            let align = 'center';
            switch (column.type) {
                case "text":
                    cell = <TextCell data={{getObjectAt: this.props.rowGetter}}/>;
                    break;
                case "number":
                    cell = <NumberCell data={{getObjectAt: this.props.rowGetter}}/>;
                    align = 'right';
                    break;
                case "link":
                    cell = <LinkCell data={{getObjectAt: this.props.rowGetter}}/>;
                    break;
                case "date":
                    cell = <DateCell data={{getObjectAt: this.props.rowGetter}}/>;
                    break;
                default:
                    cell = <TextCell data={{getObjectAt: this.props.rowGetter}}/>;
                    break;
            }
            return <Column key={column.key}
                           columnKey={column.key}
                           align={align}
                           header={<Cell>{column.name}</Cell>}
                           width={column.width || 100}
                           fixedRight={column.fixedRight}
                           flexGrow={column.flexGrow || 0}
                           cell={cell}/>;
        })
    }

    createTable() {
        this.getColumns();
        const {rowCount, width, height} = this.props.tableDetail;
        return <Table
            rowHeight={30}
            rowsCount={rowCount}
            width={width}
            height={height}
            headerHeight={30}>
            {this.getColumns()}
        </Table>;
    }

    renderContent() {
        if (this.props.tableDetail) {
            return this.createTable();
        } else if (this.props.formFields) {
            return this.createForm();
        } else {
            return <div></div>
        }
    }

    formSubmitted() {
        confirmAlert({
            title: '',                        // Title dialog
            message: 'Are you sure to do this.',               // Message dialog
            childrenElement: () => <div></div>,       // Custom UI or Component
            confirmLabel: 'Confirm',                           // Text button confirm
            cancelLabel: 'Cancel',                             // Text button cancel
            onConfirm: () => this.startProcessing(),    // Action after Confirm
            onCancel: () => console.log("no changes"),      // Action after Cancel
        });
    }

    render() {
        let minimizeTool = (this.state.boxProp.minimizeTool) ?
            <BoxTool clickHandler={this.minimizeIconCLickHandler.bind(this)} icon="fa-window-minimize"
                     hidden={this.state.boxProp.minimized}></BoxTool> : "";
        let maximizeTool = (this.state.boxProp.minimizeTool) ?
            <BoxTool clickHandler={this.maximizeIconCLickHandler.bind(this)} icon="fa-window-maximize"
                     hidden={!this.state.boxProp.minimized}></BoxTool> : "";
        let closeTool = (this.state.boxProp.closeTool) ?
            <BoxTool clickHandler={this.closeIconClickHandler.bind(this)} icon="fa-window-close-o"></BoxTool> : "";
        return <div className="box" style={{width: this.state.boxProp.minimized ? "20%" : "50%"}}>
            <div className="box-header">
                <span className="box-title">{this.props.boxProp.title}</span>
                <div className="box-tools">
                    {minimizeTool}{maximizeTool}{closeTool}
                </div>
            </div>
            <div className="box-body" style={{display: (this.state.boxProp.minimized ? 'none' : 'grid')}}>
                <div className="box-body-content">{this.renderContent()}</div>
                <div className="box-btn-panel">
                    <button className="submit-btn"
                            onClick={this.formSubmitted.bind(this)}
                            disabled={this.state.submitted ? 'disable' : ''}>
                        Submit
                    </button>
                </div>
            </div>
            <div className="box-footer">
                <div className="bar-limit">
                    <div className="bar-first" style={{width: this.state.progress.completed + "%"}}>
                        {this.state.arrow}
                    </div>
                    <div className="bar-second" style={{width: (100 - this.state.progress.completed) + "%"}}>
                        &nbsp;
                    </div>
                </div>
            </div>
        </div>
    }

    componentWillReceiveProps(newProps) {
        if (newProps.fetching) {
            this.startProcessing();
        } else {
            this.endProcessing();
        }
    }


}

export default Box;
