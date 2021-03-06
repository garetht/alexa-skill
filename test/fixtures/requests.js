/* eslint-disable quote-props */

export var ALEXA_INTENT = {
  'session': {
    'new': false,
    'sessionId': 'session1234',
    'attributes': {},
    'user': {
      'userId': null
    },
    'application': {
      'applicationId': 'amzn1.echo-sdk-ams.app.12345'
    }
  },
  'version': '1.0',
  'request': {
    'intent': {
      'slots': {
        'Color': {
          'name': 'Color',
          'value': 'blue'
        }
      },
      'name': 'MyColorIsIntent'
    },
    'type': 'IntentRequest',
    'requestId': 'request5678'
  }
};

export var ALEXA_START_SESSION = {
  'session': {
    'new': true,
    'sessionId': 'session1234',
    'attributes': {},
    'user': {
      'userId': null
    },
    'application': {
      'applicationId': 'amzn1.echo-sdk-ams.app.12345'
    }
  },
  'version': '1.0',
  'request': {
    'type': 'LaunchRequest',
    'requestId': 'request5678'
  }
};

export var ALEXA_END_SESSION = {
  'session': {
    'new': false,
    'sessionId': 'session1234',
    'attributes': {},
    'user': {
      'userId': null
    },
    'application': {
      'applicationId': 'amzn1.echo-sdk-ams.app.12345'
    }
  },
  'version': '1.0',
  'request': {
    'type': 'SessionEndedRequest',
    'requestId': 'request5678'
  }
};

/* eslint-enable quote-props */

