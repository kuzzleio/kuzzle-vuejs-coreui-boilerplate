const
  ExampleController = require('../../lib/controllers/ExampleController'),
  RequestMock = require('../mocks/request.mock'),
  should = require('should');

describe('ExampleController', () => {
  let
    exampleController,
    request;

  beforeEach(() => {
    exampleController = new ExampleController({}, {});
    request = new RequestMock();
  });

  describe('#info', () => {
    it('return current user id', async () => {
      request.context.user._id = 'aschen';

      const response = await exampleController.info(request);

      should(response).be.eql('Hello from example:info. Current user id: aschen');
    });
  });

});
