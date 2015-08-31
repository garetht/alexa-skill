var Response = function(context, session) {
  this.context = context;
  this.session = session;
};

Response.prototype = (function() {
  var buildSpeechletResponse = function(options) {
    var alexaResponse = {
      outputSpeech: {
        type: 'PlainText',
        text: options.output
      },
      shouldEndSession: options.shouldEndSession
    };
    if (options.reprompt) {
      alexaResponse.reprompt = {
        outputSpeech: {
          type: 'PlainText',
          text: options.reprompt
        }
      };
    }
    if (options.cardTitle && options.cardContent) {
      alexaResponse.card = {
        type: 'Simple',
        title: options.cardTitle,
        content: options.cardContent
      };
    }
    var returnResult = {
      version: '1.0',
      response: alexaResponse
    };
    if (options.session && options.session.attributes) {
      returnResult.sessionAttributes = options.session.attributes;
    }
    return returnResult;
  };

  return {
    tell: function(speechOutput) {
      this.context.succeed(buildSpeechletResponse({
        session: this.session,
        output: speechOutput,
        shouldEndSession: true
      }));
    },
    tellWithCard: function(speechOutput, cardTitle, cardContent) {
      this.context.succeed(buildSpeechletResponse({
        session: this.session,
        output: speechOutput,
        cardTitle: cardTitle,
        cardContent: cardContent,
        shouldEndSession: true
      }));
    },
    ask: function(speechOutput, repromptSpeech) {
      this.context.succeed(buildSpeechletResponse({
        session: this.session,
        output: speechOutput,
        reprompt: repromptSpeech,
        shouldEndSession: false
      }));
    },
    askWithCard: function(speechOutput, repromptSpeech, cardTitle, cardContent) {
      this.context.succeed(buildSpeechletResponse({
        session: this.session,
        output: speechOutput,
        reprompt: repromptSpeech,
        cardTitle: cardTitle,
        cardContent: cardContent,
        shouldEndSession: false
      }));
    }
  };
})();

export default Response;
