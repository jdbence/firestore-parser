const getFireStoreProp = (value) => {
  const props = ['arrayValue', 'booleanValue', 'geoPointValue', 'integerValue', 'mapValue', 'nullValue', 'referenceValue', 'stringValue', 'timestampValue']
  return Object.keys(value).find(k => props.indexOf(k) !== -1)
}

export const FireStoreParser = (value) => {
  const type = typeof value
  if (value === null || type === 'number' || type === 'string') {
    return value
  }
  const prop = getFireStoreProp(value)
  if (prop) {
    if (prop === 'integerValue') {
      return Number(value[prop])
    }
    else if (prop === 'arrayValue') {
      return value[prop].values.map(v => FireStoreParser(v))
    }
    else if (prop === 'mapValue') {
      value = value[prop].fields
    }
    else if (prop === 'geoPointValue') {
      return { latitude: 0, longitude: 0, ...value[prop] }
    }
    else {
      return value[prop]
    }
  }

  const obj = {};
  Object.keys(value).forEach(k => {
    obj[k] = FireStoreParser(value[k])
  });
  return obj;
}
export default FireStoreParser
