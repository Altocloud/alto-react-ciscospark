import React from 'react';
import ReactDOM from 'react-dom';

import '@ciscospark/react-component-spark-fonts';

import AltoSparkVideo from '@altocloud/alto-spark-video';

const interaction = {
  id: `12345`,
  provider: {
    type: `spark`
  },
  state: `open`
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
    account={{id: `9c42eeeb`}}
    closeInteraction={closeInteraction}
    interaction={interaction}
    openInteraction={openInteraction}
    toPersonEmail={`colm.seale@altocloud.com`}
    updateInteraction={updateInteraction}
  />,
  document.getElementById(`main`)
);

/*ReactDOM.render(
  <AltoSparkVideo
    accessToken={`MmNkOTlkMDUtNzFlMC00NzcxLWExOTAtMDQ4YjhjMWFmNWZjNTU4ZWE4YzItMTRh`}
    toPersonEmail={`colm.seale@altocloud.com`}
  />,
  document.getElementById(`main`)
);*/
