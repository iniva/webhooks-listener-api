[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

# Webhooks Listener API <!-- omit in toc -->
Webhooks Listener & Slack Notifier

- [GitLab Integration](#GitLab-Integration)
  - [Hook Configuration](#Hook-Configuration)
- [API development](#API-development)
  - [Getting Started](#Getting-Started)
  - [Running the project from your Host machine](#Running-the-project-from-your-Host-machine)
  - [Available commands](#Available-commands)
    - [yarn start:[environment]](#yarn-startenvironment)
    - [yarn clean](#yarn-clean)
    - [yarn build](#yarn-build)
    - [yarn test](#yarn-test)
    - [yarn lint](#yarn-lint)
    - [yarn commit](#yarn-commit)
# GitLab Integration
To create an integration you need to add the following values into the [repositories](src/config/repositories.js) config file:
* **Repository name** you want to enable
* **Slack Channel** in which you want to receive the notifications

## Hook Configuration
1. On your GitLab project go to `Settings -> Integrations`
2. Put the following URL, replacing `{repoName}` with your project name:
   ```
   https://this.api.domain/webhooks/gitlab/{repoName}
   ```

3. Check the events you want to send to your Slack channel (defined on the [Pre-requisite](#pre-requisite) section)
   * Available events can be found at:
   ```
   /GET https://this.api.domain/webhooks/gitlab
   ```
4. Click the `Add webhook` button

# API development

## Getting Started
**Clone this repo**
```
~$ git clone git@github.com:iniva/webhooks-listener-api.git
```

## Running the project from your Host machine
To use your machine to run everything you will need:
* Node **Dubnium**. Using [nvm](https://github.com/creationix/nvm) is easy and recommended
* **Mac**
    * Run `brew install nvm`
* **Ubuntu**
    * For the latest version check [nvm releases](https://github.com/creationix/nvm/releases)
    *   ```
        curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
        source ~/.profile
        ```
* **Both Platforms**
    * Run `nvm install lts/dubnium --latest-npm` to install the current LTS version of Node. Also, attempt to install the latest npm version
    * Run `nvm use lts/dubnium` to set Node to use this version
    * Run `yarn install` to install the project dependencies
    * Run `yarn start:dev` to start the API [see below for more options](#available-commands)
    * By default the API will listen to [http://0.0.0.0:8091](http://0.0.0.0:8091)

## Available commands

### yarn start:[environment]
Start API server in _environment_ mode listening on port 8091
* Environments:
  * dev
  * prod

### yarn clean
Remove build files

### yarn build
Generate build files (**dist** folder)

### yarn test
Run the test suites

### yarn lint
Run lint tool

### yarn commit
Helps you make commit messages using the project standardized format
