import React, { Component } from 'react';

import moment from 'moment-timezone';
import { now } from 'moment';

import 'moment/locale/fr';
import 'moment/locale/en-gb';

import './Clock.css'

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
        let classNames = "card-face card-face-front";
        if (!this.props.settingFace) classNames += " first-card-face"
        else classNames += " second-card-face" ;
        return (
            <div className={classNames}>
                <h2>{this.state.timezone}</h2>
                <div className="time">{this.state.time}</div>
            </div>
        );
    }

    renderSettings = () => {
        let classNames = "card-face card-face-back";
        if (this.props.settingFace) classNames += " first-card-face"
        else classNames += " second-card-face";
        return (
            <div className={classNames}>
                <h2>Settings</h2>
                <form onSubmit={this.handleSubmit}>
                    <select name="timezone" defaultValue={this.state.timezone}>
                        {moment.tz.names().map(this.itemTimezone)}
                    </select>
                    <div className="format-container">
                        <label>
                            12h
                                <input type="radio" name="format" value="12h" defaultChecked={this.state.format === '12h'} />
                        </label>
                        <label>
                            - 24h
                                <input type="radio" name="format" value="24h" defaultChecked={this.state.format === '24h'} />
                        </label>
                    </div>
                    <input className="submit-button" type="submit" value="Save" />
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
        this.setState({ time: moment(now()).tz(this.state.timezone).format('LTS') });
    }
}