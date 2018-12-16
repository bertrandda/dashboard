import React, { Component } from 'react';

import './Module.sample.css'

export default class ModuleSample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            /* stateKey: props.data ? props.data.stateKey : defaultValue */
        };
    }

    render() {
        return (
            <span style={{ width: 'inherit', height: 'inherit' }}>
                {this.renderDisplay()}
                {this.renderSettings()}
            </span>
        );
    }

    componentDidMount() {
        /* Register event to save module on page close */
        window.addEventListener("beforeunload", (event) => {
            this.props.saveModule({
                type: this.props.type,
                data: this.state
            });
        });
    }

    /**
     * Render module page
     */
    renderDisplay = () => {
        let classNames = "card-face card-face-front";
        if (!this.props.settingFace) classNames += " first-card-face"
        else classNames += " second-card-face";
        return (
            <div className={classNames}>
                {/* Write your module page */}
            </div>
        );
    }

    /**
     * Render module setting page
     */
    renderSettings = () => {
        let classNames = "card-face card-face-back";
        if (this.props.settingFace) classNames += " first-card-face"
        else classNames += " second-card-face";
        return (
            <div className={classNames}>
                <h2>Settings</h2>
                <form onSubmit={this.handleSubmit}>
                    {/* Write your module setting page */}
                    <input className="submit-button" type="submit" value="Save" />
                </form>
            </div>
        );
    }

    /**
     * Apply settings on state
     */
    handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        this.setState({
            /* stateKey: data.get('inputName') */
        });
        this.props.toggleSettingFace(false);
    }
}