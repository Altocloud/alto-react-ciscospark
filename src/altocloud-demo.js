import React from 'react';
import ReactDOM from 'react-dom';

import {IntlProvider} from 'react-intl';
import messages from './locales/en';

import '@ciscospark/react-component-spark-fonts';

import AltocloudDemoWidget from './altocloud-demo-widget';


ReactDOM.render(
  <IntlProvider locale={`en`} messages={messages}>
    <AltocloudDemoWidget />
  </IntlProvider>,
  document.getElementById(`main`)
);
