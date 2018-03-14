# firestore-parser &middot; [![Maintainability](https://api.codeclimate.com/v1/badges/c021344dfe81edfce992/maintainability)](https://codeclimate.com/github/jdbence/firestore-parser/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/c021344dfe81edfce992/test_coverage)](https://codeclimate.com/github/jdbence/firestore-parser/test_coverage) [![npm version](https://img.shields.io/npm/v/firestore-parser.svg?style=flat)](https://www.npmjs.com/package/firestore-parser) [![npm license](https://img.shields.io/npm/l/firestore-parser.svg?style=flat)](https://www.npmjs.com/package/firestore-parser)

Parse the Firestore REST API endpoint JSON into a useable JS object

## Installation

```
  // Install with NPM
  npm install firestore-parser --save
  // or Install with Yarn
  yarn add firestore-parser
```

## Examples

```JS
  import FireStoreParser from 'firestore-parser'
  const projectID = '[PROJECT_ID]'
  const key = '[API_KEY]'
  const doc = '[DOCUMENT]'
  const url = `https://firestore.googleapis.com/v1beta1/projects/${projectID}/databases/(default)/documents/${doc}?key=${key}`
  
  fetch(url)
    .then(response => response.json())
    .then(json => FireStoreParser(json))
    .then(json => console.log(json));
```

### Data Structure

The Firestore JSON returned in the REST API, uses value type as keys. This can be difficult to work with since you have to know the data type prior getting the value. The `firestore-parser` removes this barrier for you.
#### Firestore JSON
```
{
  "obj": {
    "mapValue": {
      "fields": {
        "string": {
          "stringValue": "def"
        }
      }
    }
  }
}
```
#### firestore-parser
```
{
  "obj": {
    "string": "def"
  }
}
```