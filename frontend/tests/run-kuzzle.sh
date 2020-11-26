#!/bin/sh

set -e

while ! curl -f -s -o /dev/null http://localhost:9200
do
    echo "[$(date)] - waiting for ElasticSearch to be up"
    sleep 5
done

node tests/app.js &

echo "[$(date)] - Starting Kuzzle..."
while ! curl -f -s -o /dev/null http://localhost:7512
do
    echo "[$(date)] - Still trying to connect to Kuzzle"
    sleep 5
done
