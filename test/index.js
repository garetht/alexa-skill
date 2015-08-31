import assert from 'assert';
import sinon from 'sinon';
import AlexaSkill from '../lib';
import { LaunchableSkill,
         ColorisSkill } from './fixtures/concretes.js';

import lambdaContext from './fixtures/lambda_context_mock.js';
import { ALEXA_INTENT,
         ALEXA_START_SESSION,
         ALEXA_END_SESSION } from './fixtures/requests.js';

describe('Initializing the abstract AlexaSkill class', function() {

  var alexaSkill;
  beforeEach(function() {
    alexaSkill = new LaunchableSkill('amzn1.echo-sdk-ams.app.12345');
  });

  it('sets the application ID', function() {
    assert.equal(alexaSkill.appId, 'amzn1.echo-sdk-ams.app.12345', 'The App ID should equal the value passed in.');
  });

  it('calls the session started handler when the session is new', function() {
    var sessionStartedSpy = sinon.spy(alexaSkill, 'onSessionStartedEvent');
    alexaSkill.execute(ALEXA_START_SESSION, lambdaContext);
    assert(sessionStartedSpy.calledOnce, 'The session started event must be called for a new session.');
  });

  it('does not call the session started handler when the session exists', function() {
    var sessionStartedSpy = sinon.spy(alexaSkill, 'onSessionStartedEvent');
    alexaSkill.execute(ALEXA_END_SESSION, lambdaContext);
    assert(!sessionStartedSpy.called, 'The session started event must not be called for an existing session.');
  });

  it('dynamically calls the correct handlers for a LaunchRequest', function() {
    var launchRequestSpy = sinon.spy(alexaSkill, 'handleLaunchRequest');
    var launchEventSpy = sinon.spy(alexaSkill, 'onLaunchEvent');
    alexaSkill.execute(ALEXA_START_SESSION, lambdaContext);
    assert(launchRequestSpy.calledOnce, 'The LaunchRequest request handler must be called when a LaunchRequest is received.');
    assert(launchEventSpy.calledOnce, 'The LaunchRequest request handler must be called when a LaunchRequest is received.');
  });

  it('dynamically calls the correct handlers for a SessionEndedRequest', function() {
    var launchRequestSpy = sinon.spy(alexaSkill, 'handleSessionEndedRequest');
    alexaSkill.execute(ALEXA_END_SESSION, lambdaContext);
    assert(launchRequestSpy.calledOnce, 'The LaunchRequest request handler must be called when a LaunchRequest is received.');
  });
});


describe('Handling Intent Actions in a concrete AlexaSkill', function() {
  var intentSkill;
  beforeEach(function() {
    intentSkill = new ColorisSkill('amzn1.echo-sdk-ams.app.12345');
  });

  it('dynamically calls an intent request handler and event handler when receiving an intent', function() {
    var intentRequestSpy = sinon.spy(intentSkill, 'handleIntentRequest');
    var intentEventHandlerSpy = sinon.spy(intentSkill, 'onIntentEvent');
    var intentSpy = sinon.spy(intentSkill, 'handleMyColorIsIntent');
    intentSkill.execute(ALEXA_INTENT, lambdaContext);
    assert(intentRequestSpy.calledOnce, 'The IntentRequest handler must be called.');
    assert(intentEventHandlerSpy.calledOnce, 'The Intent event handler must be called.');
    assert(intentSpy.calledOnce, 'The Intent handler itself is called.');
  });
});

describe('Handling failures in the AlexaSkill class', function() {

  var applicationIdMismatchSkill;
  var launchEventNotImplementedSkill;
  var intentHandlerMissingSkill;
  var context;

  beforeEach(function() {
    applicationIdMismatchSkill = new LaunchableSkill('amzn1.echo-sdk-ams.app.function');
    intentHandlerMissingSkill = new LaunchableSkill('amzn1.echo-sdk-ams.app.12345');
    launchEventNotImplementedSkill = new AlexaSkill('amzn1.echo-sdk-ams.app.12345');

    context = sinon.mock(lambdaContext);
  });

  it('handles an application ID mismatch error', function() {
    context.expects('fail').once();
    applicationIdMismatchSkill.execute(ALEXA_START_SESSION, lambdaContext);
    context.verify();
  });

  it('handles an intent handler not found error', function() {
    context.expects('fail').once();
    intentHandlerMissingSkill.execute(ALEXA_INTENT, lambdaContext);
    context.verify();
  });

  it('handles an onLaunchEvent not found error', function() {
    context.expects('fail').once();
    launchEventNotImplementedSkill.execute(ALEXA_START_SESSION, lambdaContext);
    context.verify();
  });
});
