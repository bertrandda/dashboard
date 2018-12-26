import React, { Component } from 'react';

import Clock from './Clock';
import Notes from './Notes';
import Calculator from './Calculator';

import { mdiClock, mdiSettings, mdiDelete, mdiClipboardText, mdiCalculatorVariant } from '@mdi/js'

import styles from './Module.module.css';
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
                <div className={styles['container']}>
                    <Icon id="clock-icon" className={styles['type-icon']} onClick={() => this.setModuleType('CLOCK')} path={mdiClock} size={1} />
                    <Icon id="notes-icon" className={styles['type-icon']} onClick={() => this.setModuleType('NOTES')} path={mdiClipboardText} size={1} />
                    <Icon className={styles['type-icon']} onClick={() => this.setModuleType('CLOCK')} path={mdiClock} size={1} />
                    <Icon className={styles['type-icon']} onClick={() => this.setModuleType('NOTES')} path={mdiClipboardText} size={1} />
                    <Icon className={styles['type-icon']} onClick={() => this.setModuleType('CALC')} path={mdiCalculatorVariant} size={1} />
                </div>
            );
        } else {
            let classContainer = styles['container'];
            // if(!this.state.settingFace) classContainer += ' container-front';
            if (this.state.settingFace) classContainer += ` ${styles['container-back']}`;

            return (
                <div className={classContainer}>
                    {this.state.module}
                    <div className={styles['module-icon-container']}>
                        <Icon className={styles['module-icon']} onClick={() => this.toggleSettingFace(!this.state.settingFace)} path={mdiSettings} size={0.5} />
                        <Icon className={styles['module-icon']} onClick={() => this.deleteModule()} path={mdiDelete} size={0.5} />
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
        if (this.props.data) this.setModuleType(this.props.type);
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
        if (!this.props.data) localStorage.setItem(this.props.idKey, '');
        let component;
        switch (type) {
            case 'CLOCK':
                component = Clock;
                break;
            case 'NOTES':
                component = Notes;
                break;
            case 'CALC':
                component = Calculator;
                break;
            default:
                console.log('Unknown module type');
        }

        this.setState({
            type: type
        }, () => {
            this.setState({
                module: React.createElement(component, { idKey: this.props.idKey, data: this.props.data, ...this.state })
            })
        });
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