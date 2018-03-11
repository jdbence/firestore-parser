# firestore-parser [![Maintainability](https://api.codeclimate.com/v1/badges/c021344dfe81edfce992/maintainability)](https://codeclimate.com/github/jdbence/firestore-parser/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/c021344dfe81edfce992/test_coverage)](https://codeclimate.com/github/jdbence/firestore-parser/test_coverage)

Parse the Firestore REST API endpoint JSON into a useable JS object

### Installation
```
  npm install firestore-parser --save
  yarn add firestore-parser
```

### Examples
```JS
  import FireStoreParser from 'firestore-parser'
  const json = {
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
  console.log(FireStoreParser(json))
```
