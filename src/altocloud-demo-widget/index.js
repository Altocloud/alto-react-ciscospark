/* eslint-disable react/no-set-state */
import React, {Component} from 'react';
import classNames from 'classnames';
import SparkGuest from '@altocloud/spark-guest';
import WidgetVideo from '@altocloud/widget-customer-video';
import LoadingScreen from '@ciscospark/react-component-loading-screen';

import styles from './styles.css';


class AltocloudDemoWidget extends Component {
  constructor(props) {
    super(props);
    const l = window.location;
    const redirectUri = `${l.protocol}//${l.host}${l.pathname}`.replace(/\/$/, ``);
    const clientId = `C9f24bf43155fb3ce41318e1e8a8ed6c2b68473db918f565114be1109c7c41776`;
    const clientSecret = `f5f27639932113988d1e641981c4461816c452f74fea52cf4de8134dec4a812f`;
    this.state = {
      authenticate: false,
      running: false,
      clientId,
      clientSecret,
      scope: `spark:kms spark:rooms_read spark:rooms_write spark:memberships_read spark:memberships_write spark:messages_read spark:messages_write`,
      redirectUri
    };
    this.sparkGuest = new SparkGuest(`9c42eeeb`);
  }

  componentWillMount() {
    this.sparkGuest.getFreeUser().then((data) => {
      this.setState({accessToken: data.accessToken});
    });
    // this.setState({accessToken: `OTRkNjIyOTEtYmIyYy00YWYwLWIwMDMtZGQxZjNlZjk1MGRmZTVjODdiNmMtMzMw`}); //dev@altocloud.com
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    if (this.state.accessToken) {
      return (
        <div className={classNames(`widget-component-container`, styles.widgetComponentContainer)}>
          <WidgetVideo accessToken={this.state.accessToken} />
        </div>);
    }
    return (
      <div className={classNames(`widget-component-container`, styles.widgetComponentContainer)}>
        <LoadingScreen loadingMessage={`Getting OAuth Token`} />
      </div>);
  }
}

AltocloudDemoWidget.title = `Altocloud Customer Video`;
AltocloudDemoWidget.path = `/wmm-demo`;

export default AltocloudDemoWidget;
