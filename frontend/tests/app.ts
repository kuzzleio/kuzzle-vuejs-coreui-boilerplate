const { Backend } = require('kuzzle');

const app = new Backend('kuzzle');

app._support.mappings = require('./cypress/fixtures/mappings.json');
app._support.fixtures = require('./cypress/fixtures/fixtures.json');

app.start().then(async () => {
  await app.sdk.query({
    controller: 'admin',
    action: 'loadSecurities',
    body: require('./cypress/fixtures/securities.json')
  });
});
