#!/bin/bash

rm -rf dist
yarn generate
minify -r -o dist/ dist # golang minify
firebase deploy
