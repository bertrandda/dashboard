import React, { Component } from 'react';

import Clock from './Clock';

import { mdiClock, mdiSettings, mdiDelete } from '@mdi/js'

import './Module.css'
import Icon from '@mdi/react';

export default class Module extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type,
            settingFace: props.data ? false : true,
            toggleSettingFace: this.toggleSettingFace,
            saveModule: this.saveModule,
            module: null
        };
    }

    render() {
        if (this.state.type === undefined) {
            return (
                <div className="container">
                    <Icon className="type-icon" onClick={() => this.setModuleType('CLOCK')} path={mdiClock} size={1} />
                </div>
            );
        } else {
            let classContainer = 'container';
            // if(!this.state.settingFace) classContainer += ' container-front';
            if(this.state.settingFace) classContainer += ' container-back';
            
            return (
                <div className={classContainer}>
                    {this.state.module}
                    <div className="module-icon-container">
                        <Icon className="module-icon" onClick={() => this.toggleSettingFace(!this.state.settingFace)} path={mdiSettings} size={0.5} />
                        <Icon className="module-icon" onClick={() => this.deleteModule()} path={mdiDelete} size={0.5} />
                    </div>
                </div>
            );
        }
    }

    componentDidMount() {
        if (this.props.data) {
            this.setState({
                module: React.createElement(Clock, { idKey: this.props.idKey, data: this.props.data, ...this.state })
            })
        }
    }

    deleteModule = () => {
        this.props.delete(this.props.idKey);
        this.deleted = true;
    }

    saveModule = (data) => {
        if (!this.deleted) {
            localStorage.setItem(this.props.idKey, JSON.stringify({ type: this.state.type, ...data }));
        }
    }

    setModuleType = (type) => {
        // Create save
        localStorage.setItem(this.props.idKey, '');
        switch (type) {
            case 'CLOCK':
                this.setState({
                    type: type
                }, () => {
                    this.setState({
                        module: React.createElement(Clock, { idKey: this.props.idKey, ...this.state })
                    })
                });
                break;
            default:
                console.log('Unknown module type');
        }
    }

    toggleSettingFace = (face) => {
        this.setState({
            settingFace: face
        }, () => {
            this.setState({
                module: React.cloneElement(this.state.module, { ...this.state })
            })
        });
    }
}