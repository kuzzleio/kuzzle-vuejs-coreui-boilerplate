const
  AwesomeService = require('../../lib/services/AwesomeService'),
  ContextMock = require('../mocks/context.mock'),
  RequestMock = require('../mocks/request.mock'),
  should = require('should');

describe('AwesomeService', () => {
  let
    awesomeService,
    request,
    configMock,
    contextMock;

  beforeEach(() => {
    contextMock = new ContextMock();

    configMock = {
      awesomeMessages: ['Sehr gut']
    };

    awesomeService = new AwesomeService(contextMock, configMock);
  });

  describe('#addAwesomeness', () => {
    beforeEach(() => {
      request = new RequestMock({
        input: {
          body: {
            some: 'property',
            another: {
              nested: 'property'
            }
          }
        }
      });
    });

    it('adds an awesome message to the document body', async () => {
      const modifiedRequest = await awesomeService.addAwesomeness(request);

      should(modifiedRequest.input.body.awesomeness).be.eql('Sehr gut');
    });

    it('increments the message count in redis', async () => {
      await awesomeService.addAwesomeness(request);

      should(contextMock.accessors.sdk.ms.incr).be.calledOnce();
      should(contextMock.accessors.sdk.ms.incr).be.calledWith('Sehr gut');
    });

  });
});
