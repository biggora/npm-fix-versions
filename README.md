[![Build Status](https://travis-ci.org/biggora/npm-fix-versions.png?branch=master)](https://travis-ci.org/biggora/npm-fix-versions)
[![NPM version](https://badge.fury.io/js/npm-fix-versions.png)](http://badge.fury.io/js/npm-fix-versions)
# npm-fix-versions

This module scan `node_modules` directory and update current versions for npm modules into your project `package.json`.

## Installation

```bash
$ sudo npm install npm-fix-versions -g
```

## Usage
```
  Usage: npm-fix-versions [options]

  Options:

    -h, --help        output usage information
    -V, --version     output the version number
    -c, --comparator  Add comparator
    -p, --production  Add production dependencies
    -d, --dev         Add dev dependencies
    -o, --optional    Add optional dependencies
```

## Get started!

```bash
$ cd /project_directory
$ npm-fix-versions -p -d -c ^
```

before:
```js
    "dependencies": {
        "semver": "*",
        "commander": "latest"
    },
    "devDependencies": {
        "mocha": "*",
        "chai": "*"
    }
```

after:
```js
    "dependencies": {
        "semver": "^1.0.0",
        "commander": "^2.0.0"
    },
    "devDependencies": {
        "mocha": "^3.5.0",
        "chai": "^2.33.11"
    }
```



