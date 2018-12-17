import React, { Component } from 'react';

import styles from './Notes.module.css'

export default class Notes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: props.data ? props.data.notes : ''
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
        if (!this.props.settingFace) classNames += ` ${styles['first-card-face']}`
        else classNames += ` ${styles['second-card-face']}`;
        return (
            <div className={classNames}>
                <h2>Notes</h2>
                <textarea className={styles['notes-text-area']} value={this.state.notes} onChange={this.handleChange} />
            </div>
        );
    }

    /**
     * Render module setting page
     */
    renderSettings = () => {
        let classNames = `${styles['card-face']} ${styles['card-face-back']}`;
        if (this.props.settingFace) classNames += ` ${styles['first-card-face']}`
        else classNames += ` ${styles['second-card-face']}`;
        return (
            <div className={classNames}>
                <h2>Settings</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        A simple text area for your notes
                    </div>
                    <input className={styles['submit-button']} type="submit" value="Ok" />
                </form>
            </div>
        );
    }

    /**
     * Apply settings on state
     */
    handleSubmit = (event) => {
        event.preventDefault();

        this.props.toggleSettingFace(false);
    }

    handleChange = (event) => {
        this.setState({ notes: event.target.value });
    }
}