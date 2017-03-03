/* eslint-disable react/no-set-state */
import React, {Component} from 'react';
import classNames from 'classnames';
import cookie from 'react-cookie';
import autobind from 'autobind-decorator';

import SparkLogo from '@ciscospark/react-component-spark-logo';
import SparkOAuth from '@ciscospark/react-component-spark-oauth';
import WidgetMessageMeet from '@altocloud/widget';

import styles from './styles.css';


class DemoWidgetMessageMeet extends Component {
  constructor(props) {
    super(props);
    const l = window.location;
    const redirectUri = `${l.protocol}//${l.host}${l.pathname}`.replace(/\/$/, ``);
    const clientId = process.env.MESSAGE_DEMO_CLIENT_ID;
    const clientSecret = process.env.MESSAGE_DEMO_CLIENT_SECRET;
    this.state = {
      authenticate: false,
      accessToken: cookie.load(`accessToken`) || ``,
      running: false,
      clientId,
      clientSecret,
      scope: `spark:kms spark:rooms_read spark:rooms_write spark:memberships_read spark:memberships_write spark:messages_read spark:messages_write`,
      redirectUri
    };
  }

  shouldComponentUpdate() {
    return true;
  }

  @autobind
  handleSubmit(e) {
    e.preventDefault();
    // get Free User Information
    // cookie.save(`accessToken`, this.state.accessToken);
    // cookie.save(`toPersonEmail`, this.state.toPersonEmail);
    this.setState({running: true});
  }

  @autobind
  handleLoginOAuth(e) {
    e.preventDefault();
    this.setState({authenticate: true});
  }

  @autobind
  handleOnAuth(token) {
    return this.setState({accessToken: token, authenticate: false});
  }

  createWidget(e) {
    e.preventDefault();
    return this.setState({running: true});
  }

  render() {
    const loadButtonEnabled = this.state.accessToken && this.state.toPersonEmail;
    if (this.state.running) {
      return (
        <div className={classNames(`widget-component-container`, styles.widgetComponentContainer)}>
          <WidgetMessageMeet accessToken={this.state.accessToken} toPersonEmail={this.state.toPersonEmail} />
        </div>);
    }
    return (
      <div className={classNames(`demo-wrapper`, styles.demoWrapper)}>
        <div className={classNames(`logo`, styles.logo)}>
          <SparkLogo />
        </div>
        <form className={classNames(`demo-form`, styles.demoForm)}>
          {`Altocloud Cisco Spark Guest Demo Example`}
          <button
            className={classNames(`button`, styles.button)}
            disabled={!loadButtonEnabled}
            onClick={this.handleSubmit}
          >
            {`Login as Guest`}
          </button>
          <SparkOAuth
            clientId={this.state.clientId}
            clientSecret={this.state.clientSecret}
            doAuth={this.state.authenticate}
            onAuth={this.handleOnAuth}
            redirectUri={this.state.redirectUri}
            scope={this.state.scope}
          />
        </form>
      </div>
    );
  }
}

DemoWidgetMessageMeet.title = `Widget Message Meet`;
DemoWidgetMessageMeet.path = `/wmm-demo`;

export default DemoWidgetMessageMeet;

