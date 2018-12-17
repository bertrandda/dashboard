import React, { Component } from 'react';

import moment from 'moment-timezone';
import { now } from 'moment';

import 'moment/locale/fr';
import 'moment/locale/en-gb';

import styles from './Clock.module.css';

export default class Clock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timezone: props.data ? props.data.timezone : 'Europe/Paris',
            format: props.data ? props.data.format : '12h',
            time: null
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
        this.interval = setInterval(() => this.clock(), 100);
        window.addEventListener("beforeunload", (event) => {
            this.props.saveModule({
                type: this.props.type,
                data: this.state
            });
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderDisplay = () => {
        let classNames = `${styles['card-face']} ${styles['card-face-front']}`;
        if (!this.props.settingFace) classNames += ` ${styles['first-card-face']}`;
        else classNames += ` ${styles['second-card-face']}`;
        return (
            <div className={classNames}>
                <h2>{this.state.timezone}</h2>
                <div className={styles['time']}>{this.state.time}</div>
            </div>
        );
    }

    renderSettings = () => {
        let classNames = `${styles['card-face']} ${styles['card-face-back']}`;
        if (this.props.settingFace) classNames += ` ${styles['first-card-face']}`;
        else classNames += ` ${styles['second-card-face']}`;
        return (
            <div className={classNames}>
                <h2>Settings</h2>
                <form onSubmit={this.handleSubmit}>
                    <select name="timezone" defaultValue={this.state.timezone}>
                        {moment.tz.names().map(this.itemTimezone)}
                    </select>
                    <div className={styles['format-container']}>
                        <label>
                            12h
                                <input type="radio" name="format" value="12h" defaultChecked={this.state.format === '12h'} />
                        </label>
                        <label>
                            - 24h
                                <input type="radio" name="format" value="24h" defaultChecked={this.state.format === '24h'} />
                        </label>
                    </div>
                    <input className={styles['submit-button']} type="submit" value="Save" />
                </form>
            </div>
        );
    }

    itemTimezone = (timezone, i) => {
        return <option key={i} value={timezone} >{timezone}</option>;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const data = new FormData(event.target);
        console.log(data);
        this.setState({
            timezone: data.get('timezone'),
            format: data.get('format')
        });
        this.props.toggleSettingFace(false);
    }

    clock = () => {
        if (this.state.format === '24h')
            moment.locale('fr');
        else
            moment.locale('en');
        console.log(this.state.timezone);
        this.setState({ time: moment(now()).tz(this.state.timezone).format('LTS') });
    }
}