const getFireStoreProp = (value) => {
  const props = ['referenceValue', 'nullValue', 'booleanValue', 'stringValue', 'timestampValue','arrayValue', 'mapValue', 'geoPointValue', 'integerValue']
  let k = Object.keys(value)[0]
  return props.indexOf(k) !== -1 ? k : null
}

export const FireStoreParser = (value) => {
  const type = typeof value
  if(value === null || type === 'number' || type === 'string'){
    return value
  }
  const prop = getFireStoreProp(value)
  if(prop){
  	if(prop === 'arrayValue'){
    	value = value[prop].values
    }else if(prop === 'mapValue'){
    	value = value[prop].fields
    }else if(prop === 'geoPointValue'){
    	return {latitude:0, longitude:0, ...value[prop]}
    } else {
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