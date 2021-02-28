#!/bin/bash


# Any installation related commands

# sudo apt-get install -y abc
#
# npm install express body-parser mongoose ejs


# Any configuration related commands

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

. ~/.nvm/nvm.sh

nvm install --lts
nvm use --lts
