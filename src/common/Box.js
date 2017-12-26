import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './box.css';
import InputFormField from './InputFormField';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


class BoxTool extends Component {
    render() {
        return <span onClick={this.props.clickHandler}
                     className={"fa " + this.props.icon + " fa-lg"}
                     style={{display: (this.props.hidden ? 'none' : 'inline'), color: "grey"}}></span>
    }
}

class Box extends Component {
    constructor(props) {
        super(props);
        console.log("Inside const ", this.props);
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
        console.log("State ", this.state);
    }

    componentWillReceiveProps(newProps) {
        // var tempObj = Object.assign({}, this.state, this.props);
        // console.log("Temp obj ", tempObj);
        // this.setState({hello: "hi"});
        // console.log("State ", this.state);
        // if (this.state.progress.start) {
        //     console.log("will mount ?", this.state.progress);
        //     this.setState({progress: Object.assign({}, this.state.progress, {start: false})});
        //     this.startProcessing();
        // } else if (this.state.progress.stop) {
        //     this.setState({progress: Object.assign({}, this.state.progress, {stop: false})});
        //     this.endProcessing();
        // }
    }

    componentWillMount() {
        // if (this.state.progress.start) {
        //     this.setState({progress: Object.assign({}, this.state.progress, {start: false})});
        //     this.startProcessing();
        // } else if (this.state.progress.stop) {
        //     this.setState({progress: Object.assign({}, this.state.progress, {stop: false})});
        //     this.endProcessing();
        // }
    }

    startProcessing() {
        this.setState(Object.assign({}, this.state, {submitted: true}));
        var timer = setInterval(() => {
            var currVal = this.state.progress.completed + 1;
            var arrow = ">";
            if (currVal >= 15 && currVal <= 20) {
                arrow = "=>";
            } else if (currVal > 20 && currVal<=28) {
                arrow = "==>";
            } else if(currVal>28){
                arrow=">==>";
            }
            this.setState({arrow: arrow, progress: Object.assign({}, this.state.progress, {completed: currVal % 100})});
        }, 2000);
        this.setState({timer: timer});
    }

    endProcessing() {
        if (this.state.progress.timer) {
            this.state.timer.clearInterval();
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
        return <div className="box" style={{width: this.state.boxProp.minimized ? "20%" : "100%"}}>
            <div className="box-header">
                <span className="box-title">{this.props.boxProp.title}</span>
                <div className="box-tools">
                    {minimizeTool}{maximizeTool}{closeTool}
                </div>
            </div>
            <div className="box-body" style={{display: (this.state.boxProp.minimized ? 'none' : 'grid')}}>
                <div className="box-body-content">{this.createForm()}</div>
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
}

export default Box;
