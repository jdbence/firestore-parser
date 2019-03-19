const getFireStoreProp = value => {
  const props = { 'arrayValue': 1, 'booleanValue': 1, 'geoPointValue': 1, 'integerValue': 1, 'doubleValue': 1, 'mapValue': 1, 'nullValue': 1, 'referenceValue': 1, 'stringValue': 1, 'timestampValue': 1 }
  let val;
  for(let key in value) {
    if(props[key] === 1) {
      val = key;
      break;
    }
  }
  return val
}

export const FireStoreParser = value => {
  const prop = getFireStoreProp(value)
  if (prop === 'integerValue' || prop === 'doubleValue') {
    value = Number(value[prop])
  }
  else if (prop === 'arrayValue') {
    value = ('values' in value[prop] ? value[prop].values : []).map(v => FireStoreParser(v))
  }
  else if (prop === 'mapValue') {
    value = FireStoreParser(value[prop].fields || {})
  }
  else if (prop === 'geoPointValue') {
    value = { latitude: 0, longitude: 0, ...value[prop] }
  }
  else if (prop) {
    value = value[prop]
  }
  else if (typeof value === 'object') {
    Object.keys(value).forEach(k => value[k] = FireStoreParser(value[k]))
  }
  return value;
}
export default FireStoreParser