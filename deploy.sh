#!/bin/bash

rm -rf dist
yarn generate
firebase deploy
