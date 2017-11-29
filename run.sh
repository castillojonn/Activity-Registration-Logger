#!/bin/sh

##rm -r ./.deploy
meteor build .deploy --directory --architecture os.linux.x86_64 --server-only
cp app.yaml ./.deploy/bundle/app.yaml
cp package.json ./.deploy/bundle/package.json
cp Dockerfile ./.deploy/bundle/Dockerfile
cd ./.deploy/bundle
gcloud app deploy app.yaml --verbosity=info