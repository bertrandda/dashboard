import React, { Component } from 'react';

import styles from './Calculator.module.css'

export default class Calculator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result: ''
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
                <div className={styles['grid-container']}>
                    <span className={styles['result']}>{this.state.result}</span>

                    <span id="seven-button" className={styles['button-item']} onClick={() => this.processCalcButton('7')}>7</span>
                    <span id="eight-button" className={styles['button-item']} onClick={() => this.processCalcButton('8')}>8</span>
                    <span id="nine-button" className={styles['button-item']} onClick={() => this.processCalcButton('9')}>9</span>
                    <span id="ca-button" className={`${styles['button-item']} ${styles['button-ca']}`} onClick={() => this.processCalcButton('CA')}>CA</span>
                    
                    <span id="four-button" className={styles['button-item']} onClick={() => this.processCalcButton('4')}>4</span>
                    <span id="five-button" className={styles['button-item']} onClick={() => this.processCalcButton('5')}>5</span>
                    <span id="six-button" className={styles['button-item']} onClick={() => this.processCalcButton('6')}>6</span>
                    <span id="divide-button" className={`${styles['button-item']} ${styles['button-operator']}`} onClick={() => this.processCalcButton('/')}>/</span>
                    <span id="time-button" className={`${styles['button-item']} ${styles['button-operator']}`} onClick={() => this.processCalcButton('*')}>*</span>

                    <span id="one-button" className={styles['button-item']} onClick={() => this.processCalcButton('1')}>1</span>
                    <span id="two-button" className={styles['button-item']} onClick={() => this.processCalcButton('2')}>2</span>
                    <span id="three-button" className={styles['button-item']} onClick={() => this.processCalcButton('3')}>3</span>
                    <span id="minus-button" className={`${styles['button-item']} ${styles['button-operator']}`} onClick={() => this.processCalcButton('-')}>-</span>
                    <span id="plus-button" className={`${styles['button-item']} ${styles['button-operator']}`} onClick={() => this.processCalcButton('+')}>+</span>


                    <span id="zero-button" className={`${styles['button-item']} ${styles['button-zero']}`} onClick={() => this.processCalcButton('0')}>0</span>
                    <span id="dot-button" className={styles['button-item']} onClick={() => this.processCalcButton('.')}>.</span>
                    <span id="equal-button" className={`${styles['button-item']} ${styles['button-equal']}`} onClick={() => this.processCalcButton('=')}>=</span>
                </div>
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
                A simple calculator
                <form onSubmit={this.handleSubmit}>
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

        // const data = new FormData(event.target);
        this.setState({
            /* stateKey: data.get('inputName') */
        });
        this.props.toggleSettingFace(false);
    }

    processCalcButton = (buttonValue) => {
        switch (buttonValue) {
            case 'CA':
                this.setState({ result: '' });
                break;
            case '=':
                // eslint-disable-next-line
                this.setState({ result: eval(this.state.result) });
                break
            default:
                this.setState({ result: this.state.result + buttonValue });
                break;
        }
    }
}