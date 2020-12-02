#!/bin/bash

set -e

kourou admin:loadMappings < tests/cypress/fixtures/mappings.json

kourou admin:loadFixtures < tests/cypress/fixtures/fixtures.json

kourou admin:loadSecurities < tests/cypress/fixtures/securities.json
