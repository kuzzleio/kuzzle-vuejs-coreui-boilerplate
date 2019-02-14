const
  BaseController = require('../../lib/controllers/BaseController'),
  ContextMock = require('../mocks/context.mock'),
  should = require('should');

describe('BaseController', () => {
  let
    contextMock,
    baseController;

  beforeEach(() => {
    contextMock = new ContextMock();
    baseController = new BaseController(contextMock, {});
  });

  describe('#actionsMapping', () => {

    it('return the controller actions mapping', () => {
      baseController.name = 'base';
      baseController.actions = [ 'foo', 'bar' ];

      const actionsMapping = baseController.actionsMapping();

      should(actionsMapping).be.eql({
        base: {
          foo: 'callAction',
          bar: 'callAction'
        }
      });
    });
  });

});
