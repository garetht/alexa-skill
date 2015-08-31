// Alexa SDK for JavaScript v1.0.00
// Copyright (c) 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved. Use is subject to license terms.

import Response from './Response.js';

export default class AlexaSkill {
  constructor(appId) {
    this.appId = appId;
  }

  // Alexa Request Handlers
  handleLaunchRequest(event, context, response) {
    this.onLaunchEvent(event.request, event.session, response);
  }

  handleIntentRequest(event, context, response) {
    this.onIntentEvent(event.request, event.session, response);
  }

  handleSessionEndedRequest(event, context) {
    this.onSessionEndedEvent(event.request, event.session);
    context.succeed();
  }

  // Event Handlers
  /* eslint-disable no-unused-vars */
  onSessionStartedEvent(sessionStartedRequest, session) {

  }

  onLaunchEvent(launchRequest, session, response) {
    throw 'onLaunch must be overridden by subclass';
  }
  /* eslint-enable no-unused-vars */


  onIntentEvent(intentRequest, session, response) {
    var intent = intentRequest.intent;
    var intentName = intentRequest.intent.name;
    var intentHandlerName = `handle${intentName}`;
    var intentHandler = this[intentHandlerName];
    if (intentHandler) {
      console.log(`Handling intent ${intentName} with handler ${intentHandlerName}`);
      intentHandler.call(this, intent, session, response);
    } else {
      throw `The intent ${intentName} is not supported. To support such
      an intent, the method ${intentHandlerName} must be present on the
    class.`;
    }
  }

  /* eslint-disable no-unused-vars */
  onSessionEndedEvent(sessionEndedRequest, session) {

  }
  /* eslint-enable no-unused-vars */

  // Main Execution
  execute(event, context) {
    try {
      console.log('session applicationId: ' + event.session.application.applicationId);

      // Validate that this request originated from authorized source.
      if (this.appId && event.session.application.applicationId !== this.appId) {
        console.log(`The applicationIds don't match : ${event.session.application.applicationId} and ${this.appId}`);
        throw 'Invalid applicationId';
      }

      if (!event.session.attributes) {
        event.session.attributes = {};
      }

      if (event.session.new) {
        this.onSessionStartedEvent(event.request, event.session);
      }

      // Route the request to the proper handler which may have been overriden.
      var requestHandler = this[`handle${event.request.type}`];
      requestHandler.call(this, event, context, new Response(context, event.session));
    } catch (e) {
      console.log('Unexpected exception ' + e);
      console.log(event, context);
      context.fail(e);
    }
  }
}
