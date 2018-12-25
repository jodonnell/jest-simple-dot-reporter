# Simple dot reporter for jest

No dependencies, no interactive shell needed, just dots.  Also this is nice because it won't swallow your console.logs.

## Installation

You may install this package as a development dependency:

```bash
npm install --save-dev jest-simple-dot-reporter
yarn add --dev jest-simple-dot-reporter
```

## Configuration

Configure [Jest](https://facebook.github.io/jest/docs/en/configuration.html) to use the reporter.

For example, create a `jest.config.js` file containing:

```javascript
module.exports = {
  "verbose": false,
  "reporters": [
    ["jest-simple-dot-reporter", {"color": true}]
  ]
};
```
