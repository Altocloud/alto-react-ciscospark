import React from 'react';
import ReactDOM from 'react-dom';

import '@ciscospark/react-component-spark-fonts';

import AltoSparkVideo from '@altocloud/alto-spark-video';

const interaction = {
  id: `12345`
};

function openInteraction(obj) {
  console.log('interaction opened', obj);
}


function closeInteraction(id) {
  console.log('interaction closed', id);
}


function updateInteraction(id, payload) {
  console.log('interaction updated', id, payload);
  return {
    then: (next) => {
      next();
    }
  };
}

ReactDOM.render(
  <AltoSparkVideo
    // accessToken={`NWJkNzgxZTUtZDAxYy00ODYyLThkZjMtNDJjNDNkYmIzM2NjNjQ1MGY3MmYtYzhl`}
    toPersonEmail={`colm.seale@altocloud.com`}
    // toPersonEmail={null}
    account={{id: `9c42eeeb`}}
    closeInteraction={closeInteraction}
    interaction={interaction}
    openInteraction={openInteraction}
    updateInteraction={updateInteraction}
  />,
  document.getElementById(`main`)
);
