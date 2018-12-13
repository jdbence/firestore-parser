/*global expect*/
import FireStoreParser from './index'

const testData = {
  "name": "some/large/long/value",
  "fields": {
    "number": {
      "integerValue": "123"
    },
    "array": {
      "arrayValue": {
        "values": [{
            "stringValue": "cat"
          },
          {
            "stringValue": "dog"
          }
        ]
      }
    },
    "timestamp": {
      "timestampValue": "2018-03-11T08:00:00Z"
    },
    "obj": {
      "mapValue": {
        "fields": {
          "string": {
            "stringValue": "def"
          }
        }
      }
    },
    "bool": {
      "booleanValue": true
    },
    "string": {
      "stringValue": "abc"
    },
    "geo": {
      "geoPointValue": {
        "latitude": 10,
        "longitude": 30
      }
    },
    "ref": {
      "referenceValue": "some/large/long/value"
    },
    "isNull": {
      "nullValue": null
    }
  },
  "createTime": "2018-03-11T14:10:11.083793Z",
  "updateTime": "2018-03-11T14:10:11.083793Z"
}

test('Simple JS object match', () => {
  expect(FireStoreParser({ data: "" })).toEqual({ data: "" });
});

test('Complex JS object match', () => {
  expect(FireStoreParser(testData)).toEqual({
    "createTime": "2018-03-11T14:10:11.083793Z",
    "fields": {
      "array": [
        "cat",
        "dog"
      ],
      "bool": true,
      "geo": {
        "latitude": 10,
        "longitude": 30
      },
      "isNull": null,
      "number": 123,
      "obj": {
        "string": "def"
      },
      "ref": "some/large/long/value",
      "string": "abc",
      "timestamp": "2018-03-11T08:00:00Z"
    },
    "name": "some/large/long/value",
    "updateTime": "2018-03-11T14:10:11.083793Z"
  });
});

test('Strings match', () => {
  expect(FireStoreParser({
    createTime: "2018-03-11T14:10:11.083793Z"
  })).toEqual({
    createTime: "2018-03-11T14:10:11.083793Z"
  });
});

test('Null match', () => {
  expect(FireStoreParser({
    "isNull": {
      "nullValue": null
    }
  })).toEqual({ "isNull": null });
});

test('Reference match', () => {
  expect(FireStoreParser({
    "ref": {
      "referenceValue": "some/longe/string/that/has/values"
    }
  })).toEqual({
    "ref": "some/longe/string/that/has/values"
  });
});

test('Geo match', () => {
  expect(FireStoreParser({
    "geo": {
      "geoPointValue": {
        "latitude": 10,
        "longitude": 30
      }
    }
  })).toEqual({
    "geo": {
      "latitude": 10,
      "longitude": 30
    }
  });
});

test('Geo match zeros', () => {
  expect(FireStoreParser({
    "geo": {
      "geoPointValue": {}
    }
  })).toEqual({
    "geo": {
      "latitude": 0,
      "longitude": 0
    }
  });
});

test('boolean match', () => {
  expect(FireStoreParser({
    "bool": {
      "booleanValue": true
    }
  })).toEqual({ "bool": true });
});

test('integer match', () => {
  expect(FireStoreParser({
    "number": {
      "integerValue": "123"
    }
  })).toEqual({ "number": 123 });
});

test('Object match', () => {
  expect(FireStoreParser({
    "obj": {
      "mapValue": {
        "fields": {
          "string": {
            "stringValue": "def"
          }
        }
      }
    }
  })).toEqual({ "obj": { "string": "def" } });
});

test('Object match with no values', () => {
  expect(FireStoreParser({
    "obj": {
      "mapValue": {}
    }
  })).toEqual({ "obj": {} });
});

test('Array match', () => {
  expect(FireStoreParser({
    "array": {
      "arrayValue": {
        "values": [{
            "stringValue": "cat"
          },
          {
            "stringValue": "dog"
          }
        ]
      }
    }
  })).toEqual({ "array": ["cat", "dog"] });
});

test('Array match with no values', () => {
  expect(FireStoreParser({
    "array": {
      "arrayValue": {}
    }
  })).toEqual({ "array": [] });
});
