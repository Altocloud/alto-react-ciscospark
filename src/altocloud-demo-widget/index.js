/* eslint-disable react/no-set-state */
import React, {Component} from 'react';
import classNames from 'classnames';
import cookie from 'react-cookie';
import autobind from 'autobind-decorator';

import SparkLogo from '@ciscospark/react-component-spark-logo';
import SparkOAuth from '@ciscospark/react-component-spark-oauth';
import WidgetVideo from '@altocloud/widget-customer-video';
import ExampleCode, {MODE_REACT, MODE_INLINE} from '../example-code';

import styles from './styles.css';


class DemoWidgetVideo extends Component {
  constructor(props) {
    super(props);
    const l = window.location;
    const redirectUri = `${l.protocol}//${l.host}${l.pathname}`.replace(/\/$/, ``);
    const clientId = `C96c667a841f0d88bf0077433e5e1a025d7ca336dd818de78b030ed2785329b7e`;
    const clientSecret = `8612b07f17dc3b61df6f7b97ab840fcb2262b34b5ad1e9228bc1ed336dccfa32`;
    this.state = {
      authenticate: false,
      mode: MODE_INLINE,
      accessToken: `OTRjM2U5M2EtMTJlNy00ZWJjLThlYmItOTNmYmNlZGRhNGQ5ZDYwNjFmYmItNmVi`,
      toPersonEmail: `hwang@altocloud.com`,
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
    cookie.save(`accessToken`, this.state.accessToken);
    cookie.save(`toPersonEmail`, this.state.toPersonEmail);
    this.setState({running: true});
  }

  @autobind
  handleAccessTokenChange(e) {
    return this.setState({accessToken: e.target.value});
  }

  @autobind
  handleEmailChange(e) {
    return this.setState({toPersonEmail: e.target.value});
  }

  @autobind
  handleModeChange(e) {
    return this.setState({mode: e.target.value});
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
    return (
      <div className={classNames(`widget-component-container`, styles.widgetComponentContainer)}>
        <WidgetVideo accessToken={this.state.accessToken} toPersonEmail={this.state.toPersonEmail} />
      </div>);
  }
}

DemoWidgetVideo.title = `Widget Message Meet`;
DemoWidgetVideo.path = `/wmm-demo`;

export default DemoWidgetVideo;
