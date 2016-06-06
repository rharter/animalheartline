#!/bin/bash

set -ex

REPO="git@github.com:rharter/animalheartline.git"
BASE_DIR=`pwd`
SRC_DIR=$BASE_DIR/dist
DIR=/tmp/site

# Delete any existing temporary website clone
rm -rf $DIR

# Clean and build the site
grunt clean build --basedir=/animalheartline

# Clone the current repo into temp folder
git clone $REPO $DIR

# Move working directory into temp folder
cd $DIR

# Checkout and track the gh-pages branch
git checkout -t origin/gh-pages

# Delete everything
rm -rf *

# Copy the generated website files
cp -R $SRC_DIR/* .

# Stage all files in git and create a commit
git add .
git add -u
git commit -m "Website at $(date)"

# Push the new files up to Github
git push origin gh-pages

# Clean up
cd $BASE_DIR
rm -rf $DIR
