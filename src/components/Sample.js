import React, { Component } from 'react';

import styles from './Sample.module.css'

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
        let classNames = `${styles['card-face']} ${styles['card-face-front']}`;
        if (!this.props.settingFace) classNames += ` ${styles['first-card-face']}`;
        else classNames += ` ${styles['second-card-face']}`;
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
        let classNames = `${styles['card-face']} ${styles['card-face-back']}`;
        if (this.props.settingFace) classNames += ` ${styles['first-card-face']}`;
        else classNames += ` ${styles['second-card-face']}`;
        return (
            <div className={classNames}>
                <h2>Settings</h2>
                <form onSubmit={this.handleSubmit}>
                    {/* Write your module setting page */}
                    <input className={styles['submit-button']} type="submit" value="Save" />
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