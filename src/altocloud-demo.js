import React from 'react';
import ReactDOM from 'react-dom';

import '@ciscospark/react-component-spark-fonts';

import AltoSparkVideo from '@altocloud/alto-spark-video';

const interaction = {};

function openInteraction() {
  console.log('interaction opened');
}


function closeInteraction() {
  console.log('interaction closed');
}


function updateInteraction() {
  console.log('interaction updated');
}

ReactDOM.render(
  <AltoSparkVideo
    account={`9c42eeeb`}
    closeInteraction={closeInteraction}
    interaction={interaction}
    openInteraction={openInteraction}
    updateInteraction={updateInteraction}
  />,
  document.getElementById(`main`)
);
