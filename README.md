[![Build Status](https://travis-ci.org/biggora/caminte.png?branch=master)](https://travis-ci.org/biggora/npm-fix-versions)
[![NPM version](https://badge.fury.io/js/caminte.png)](http://badge.fury.io/js/npm-fix-versions)
# npm-fix-versions

This module provide fixing versions in npm modules in your project.

## Installation

```
$ sudo npm install npm-fix-versions -g
```

## Usage
```
  Usage: npm-fix-versions [options]

  Options:

    -h, --help        output usage information
    -V, --version     output the version number
    -c, --comparator  Add comparator is composed of an operator and a version
    -p, --production  Scan and fix production dependencies
    -d, --dev         Scan and fix dev dependencies
    -o, --optional    Scan and fix optional dependencies
```

## Get started!

```
$ cd /project_directory
$ npm-fix-versions -c ^
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



