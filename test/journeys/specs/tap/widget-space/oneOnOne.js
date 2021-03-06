/* eslint-disable max-nested-callbacks */

import {assert} from 'chai';

import testUsers from '@ciscospark/test-helper-test-users';

import {switchToMeet, switchToMessage} from '../../../lib/menu';
import {clearEventLog, getEventLog} from '../../../lib/events';

describe(`Widget Space: One on One: TAP`, () => {
  const browserLocal = browser.select(`browserLocal`);
  const browserRemote = browser.select(`browserRemote`);
  let mccoy, spock;
  process.env.CISCOSPARK_SCOPE = [
    `webexsquare:get_conversation`,
    `spark:people_read`,
    `spark:rooms_read`,
    `spark:rooms_write`,
    `spark:memberships_read`,
    `spark:memberships_write`,
    `spark:messages_read`,
    `spark:messages_write`,
    `spark:teams_read`,
    `spark:teams_write`,
    `spark:team_memberships_read`,
    `spark:team_memberships_write`,
    `spark:kms`
  ].join(` `);

  before(`load browsers`, () => {
    browser
      .url(`/production/space.html?oneOnOne`)
      .execute(() => {
        localStorage.clear();
      });
  });

  before(`create spock`, () => testUsers.create({count: 1, config: {displayName: `Mr Spock TAP`}})
    .then((users) => {
      [spock] = users;
    }));

  before(`create mccoy`, () => testUsers.create({count: 1, config: {displayName: `Bones Mccoy TAP`}})
    .then((users) => {
      [mccoy] = users;
    }));

  before(`pause to let test users establish`, () => browser.pause(5000));

  before(`inject token for spock`, () => {
    browserLocal.execute((localAccessToken, localToUserEmail) => {
      const options = {
        accessToken: localAccessToken,
        onEvent: (eventName) => {
          window.ciscoSparkEvents.push(eventName);
        },
        toPersonEmail: localToUserEmail,
        initialActivity: `message`
      };
      window.openSpaceWidget(options);
    }, spock.token.access_token, mccoy.email);
    browserLocal.waitForExist(`[placeholder="Send a message to ${mccoy.displayName}"]`, 30000);
  });

  before(`open remote widget for mccoy`, () => {
    browserRemote.execute((localAccessToken, localToUserEmail) => {
      const options = {
        accessToken: localAccessToken,
        onEvent: (eventName) => {
          window.ciscoSparkEvents.push(eventName);
        },
        toPersonEmail: localToUserEmail,
        initialActivity: `message`
      };
      window.openSpaceWidget(options);
    }, mccoy.token.access_token, spock.email);
    browserRemote.waitForExist(`[placeholder="Send a message to ${spock.displayName}"]`, 30000);
  });

  it(`loads the test page`, () => {
    const title = browserLocal.getTitle();
    assert.equal(title, `Widget Space Production Test`);
  });

  it(`loads the user's name`, () => {
    browserLocal.waitForVisible(`h1.ciscospark-title`);
    browserLocal.waitUntil(() => browserLocal.getText(`h1.ciscospark-title`) !== `Loading...`);
    assert.equal(browserLocal.getText(`h1.ciscospark-title`), mccoy.displayName);
  });

  describe(`Activity Menu`, () => {
    const menuButton = `button[aria-label="Main Menu"]`;
    const exitButton = `.ciscospark-activity-menu-exit button`;
    const messageButton = `button[aria-label="Message"]`;
    const meetButton = `button[aria-label="Call"]`;
    const activityMenu = `.ciscospark-activity-menu`;
    const controlsContainer = `.ciscospark-controls-container`;
    const messageWidget = `.ciscospark-message-wrapper`;
    const meetWidget = `.ciscospark-meet-wrapper`;

    it(`has a menu button`, () => {
      assert.isTrue(browserLocal.isVisible(menuButton));
    });

    it(`displays the menu when clicking the menu button`, () => {
      browserLocal.click(menuButton);
      browserLocal.waitForVisible(activityMenu);
    });

    it(`has an exit menu button`, () => {
      assert.isTrue(browserLocal.isVisible(activityMenu));
      browserLocal.waitForVisible(exitButton);
    });

    it(`closes the menu with the exit button`, () => {
      browserLocal.click(exitButton);
      browserLocal.waitForVisible(activityMenu, 1500, true);
    });

    it(`has a message button`, () => {
      browserLocal.click(menuButton);
      browserLocal.element(controlsContainer).element(messageButton).waitForVisible();
    });

    it(`switches to message widget`, () => {
      browserLocal.element(controlsContainer).element(messageButton).click();
      assert.isTrue(browserLocal.isVisible(messageWidget));
      assert.isFalse(browserLocal.isVisible(meetWidget));
    });

    it(`has a meet button`, () => {
      browserLocal.click(menuButton);
      browserLocal.element(controlsContainer).element(meetButton).waitForVisible();
    });

    it(`switches to meet widget`, () => {
      browserLocal.element(controlsContainer).element(meetButton).click();
      assert.isTrue(browserLocal.isVisible(meetWidget));
      assert.isFalse(browserLocal.isVisible(messageWidget));
    });

  });

  describe(`message widget`, () => {
    before(`widget switches to message`, () => {
      switchToMessage(browserLocal);
      switchToMessage(browserRemote);
    });

    it(`sends and receives messages`, () => {
      browserLocal.waitForExist(`[placeholder="Send a message to ${mccoy.displayName}"]`, 10000);
      assert.match(browserLocal.getText(`.ciscospark-system-message`), /You created this conversation/);
      browserRemote.waitForExist(`[placeholder="Send a message to ${spock.displayName}"]`, 10000);
      // Remote is now ready, send a message to it
      browserLocal.setValue(`[placeholder="Send a message to ${mccoy.displayName}"]`, `Oh, I am sorry, Doctor. Were we having a good time?`);
      browserLocal.keys([`Enter`, `NULL`]);
      browserRemote.waitForExist(`.ciscospark-activity-item-container:last-child .ciscospark-activity-text`, 10000);
      browserRemote.waitUntil(
        () => browserRemote.getText(`.ciscospark-activity-item-container:last-child .ciscospark-activity-text`) === `Oh, I am sorry, Doctor. Were we having a good time?`,
        10000,
        `expected to receive message from local`
      );
      // Send a message back
      clearEventLog(browserLocal);
      browserRemote.setValue(`[placeholder="Send a message to ${spock.displayName}"]`, `God, I liked him better before he died.`);
      browserRemote.keys([`Enter`, `NULL`]);
      browserLocal.waitForExist(`.ciscospark-activity-item-container:last-child .ciscospark-activity-text`, 10000);
      browserLocal.waitUntil(
        () => browserLocal.getText(`.ciscospark-activity-item-container:last-child .ciscospark-activity-text`) === `God, I liked him better before he died.`,
        10000,
        `expected to receive message from remote`
      );
      const events = getEventLog(browserLocal);
      assert.include(events, `messages:created`, `has a message created event`);
      assert.include(events, `rooms:unread`, `has an unread message event`);
    });
  });

  describe(`meet widget`, () => {
    const meetWidget = `.ciscospark-meet-wrapper`;
    const messageWidget = `.ciscospark-message-wrapper`;
    const callButton = `button[aria-label="Call"]`;
    const answerButton = `button[aria-label="Answer"]`;
    const declineButton = `button[aria-label="Decline"]`;
    const hangupButton = `button[aria-label="Hangup"]`;
    const callControls = `.call-controls`;
    const remoteVideo = `.remote-video video`;

    describe(`pre call experience`, () => {
      it(`has a call button`, () => {
        switchToMeet(browserLocal);
        browserLocal.element(meetWidget).element(callButton).waitForVisible();
      });
    });

    describe(`during call experience`, () => {
      it(`can hangup in call`, () => {
        clearEventLog(browserLocal);
        switchToMeet(browserLocal);
        browserLocal.element(meetWidget).element(callButton).waitForVisible();
        browserLocal.element(meetWidget).element(callButton).click();
        browserRemote.waitForVisible(answerButton);
        browserRemote.element(meetWidget).element(answerButton).click();
        browserRemote.waitForVisible(remoteVideo);
        // Let call elapse 5 seconds before hanging up
        browserLocal.pause(5000);
        browserLocal.moveToObject(meetWidget);
        browserLocal.waitForVisible(callControls);
        browserLocal.moveToObject(hangupButton);
        browserLocal.element(meetWidget).element(hangupButton).click();
        // Should switch back to message widget after hangup
        browserLocal.waitForVisible(messageWidget);
        const events = getEventLog(browserLocal);
        assert.include(events, `calls:created`, `has a calls created event`);
        assert.include(events, `calls:connected`, `has a calls connected event`);
        assert.include(events, `calls:disconnected`, `has a calls disconnected event`);
        // Pausing to let locus session flush
        browserLocal.pause(10000);
      });

      it(`can decline an incoming call`, () => {
        switchToMeet(browserRemote);
        browserRemote.element(meetWidget).element(callButton).waitForVisible();
        browserRemote.element(meetWidget).element(callButton).click();
        browserLocal.waitForVisible(declineButton);
        browserLocal.element(meetWidget).element(declineButton).click();
        browserLocal.element(meetWidget).element(callButton).waitForVisible();
        browserRemote.element(meetWidget).element(callButton).waitForVisible();
      });
    });
  });

});
