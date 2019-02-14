class RequestMock {
  constructor(args = {}) {
    Object.entries(args).forEach(([key, value]) => {
      this[key] = value;
    });

    this.context = this.context || {};
    this.context.user = this.context.user || {};
    this.context.connection = this.context.connection || {};

    this.input = this.input || {};
    this.input.body = this.input.body || {};
    this.input.args = this.input.args || {};

    this.result = this.result || {};
  }
}

module.exports = RequestMock;
