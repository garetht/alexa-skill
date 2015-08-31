import assert from 'assert';
import sinon from 'sinon';
import {LaunchableSkill} from './fixtures/concretes.js';

import context from './fixtures/lambda_context_mock.js'
import { ALEXA_INTENT,
         ALEXA_START_SESSION,
         ALEXA_END_SESSION } from './fixtures/requests.js'

describe('Initializing the abstract AlexaSkill class', function() {

  var alexaSkill;
  beforeEach(function() {
    alexaSkill = new LaunchableSkill("amzn1.echo-sdk-ams.app.12345");
  });

  it("sets the application ID", function() {
    assert.equal(alexaSkill.appId, "amzn1.echo-sdk-ams.app.12345", 'The App ID should equal the value passed in.')
  });

  it("calls the session started handler when the session is new", function() {
    var sessionStartedSpy = sinon.spy(alexaSkill, 'onSessionStartedEvent');
    alexaSkill.execute(ALEXA_START_SESSION, context.object);
    assert(sessionStartedSpy.calledOnce, 'The session started event must be called for a new session.');
  });

  it("does not call the session started handler when the session exists", function() {
    var sessionStartedSpy = sinon.spy(alexaSkill, 'onSessionStartedEvent');
    alexaSkill.execute(ALEXA_END_SESSION, context.object);
    assert(!sessionStartedSpy.called, 'The session started event must not be called for an existing session.');
  });

  it("calls the correct handlers for a LaunchRequest", function() {
    var launchRequestSpy = sinon.spy(alexaSkill, 'handleLaunchRequest');
    var launchEventSpy = sinon.spy(alexaSkill, 'onLaunchEvent');
    alexaSkill.execute(ALEXA_START_SESSION, context.object);
    assert(launchRequestSpy.calledOnce, 'The LaunchRequest request handler must be called when a LaunchRequest is received.');
    assert(launchEventSpy.calledOnce, 'The LaunchRequest request handler must be called when a LaunchRequest is received.');
  });

  it("calls the correct handlers for a SessionEndedRequeset", function() {
    var launchRequestSpy = sinon.spy(alexaSkill, 'handleSessionEndedRequest');
    alexaSkill.execute(ALEXA_START_SESSION, context.object);
    assert(launchRequestSpy.calledOnce, 'The LaunchRequest request handler must be called when a LaunchRequest is received.');
  });

});

describe("The AlexaSkill class handles failures", function() {

  // App ID mismatch
  // Handler not found
  // Launch not implemented
});

describe("Handling Intents", function() {

});
