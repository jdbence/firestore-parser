const getFireStoreProp = (value) => {
  const props = ['arrayValue', 'booleanValue', 'geoPointValue', 'integerValue', 'mapValue', 'nullValue', 'referenceValue', 'stringValue', 'timestampValue']
  return Object.keys(value).find(k => props.indexOf(k) !== -1)
}

export const FireStoreParser = (value) => {
  const prop = getFireStoreProp(value)
  if (prop) {
    if (prop === 'integerValue') {
      value = Number(value[prop])
    }
    else if (prop === 'arrayValue') {
      value = value[prop].values.map(v => FireStoreParser(v))
    }
    else if (prop === 'mapValue') {
      value = FireStoreParser(value[prop].fields)
    }
    else if (prop === 'geoPointValue') {
      value = { latitude: 0, longitude: 0, ...value[prop] }
    }
    else {
      value = value[prop]
    }
  }
  else if (typeof value === 'object') {
    Object.keys(value).forEach(k => value[k] = FireStoreParser(value[k]))
  }
  return value;
}
export default FireStoreParser
