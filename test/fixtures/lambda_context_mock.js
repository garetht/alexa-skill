import sinon from 'sinon';

export default sinon.mock({
  succeed: function(){},
  fail: function(){},
  done: function(){},
  getRemainingTimeInMillis: function(){},

  awsRequestId: undefined,
  logStreamName: undefined,
  clientContext: undefined,
  identity: undefined,
  logGroupName: undefined,
  functionName: undefined
})
