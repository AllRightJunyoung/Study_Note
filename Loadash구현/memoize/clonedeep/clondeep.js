const arrayTag = '[object Array]'
const dateTag = '[object Date]'
const mapTag = '[object Map]'
const regexpTag = '[object RegExp]'
const setTag = '[object Set]'
const funTag = '[object Function]'
//참조형 

// 원시형
const boolTag = '[object Boolean]'
const numberTag = '[object Number]'
const objectTag = '[object Object]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const nullTag = '[object Null]'
const undefTag='[object Undefined]'
const BigIntTag = '[object BigInt]'



const PRIMITIVE_TYPE = {
    [BigIntTag]:BigIntTag,
    [numberTag]:numberTag,
    [stringTag]:stringTag,
    [symbolTag]:symbolTag,
    [nullTag]:nullTag,
    [BigIntTag]: BigIntTag,
    [boolTag]: boolTag,
    [undefTag]:undefTag
}


function deepcopy(value) {
  // 원시형 타입이면 그냥 반환
  if (isPrimitiveType(value)) {
    return value;
  }
  // 참조형 타입이면
  else {
      return copyOfRefrenceType(value);
    }
}

const isPrimitiveType = (value) => {
  const type=Object.prototype.toString.call(value)
  if (PRIMITIVE_TYPE.hasOwnProperty(type)) {
    return true;
  }
  return false
}


const copyOfRefrenceType = (originValue) => {
    const type = Object.prototype.toString.call(originValue)
    const copyOfRefrenceData=type===setTag ? copyOfDepthSet(originValue) : type===objectTag? copyOfDepthObject(originValue):type===mapTag?copyOfDepthMap(originValue):type===arrayTag?copyOfDepthArray(originValue):copyOfNewRefrenceType(originValue)
    return copyOfRefrenceData
}

const copyOfNewRefrenceType = (orginValue) => {
  const type = Object.prototype.toString.call(orginValue)  
    switch (type) {
    case dateTag:
      return new Date(orginValue.valueOf());
    case regexpTag:
        return new RegExp(orginValue);
    case funTag: //불변성 을 고려해서 만드는법을 도저히모르겠음
        return orginValue
  }
};



const copyOfDepthObject = (orginObject) => {
  const newObject = {}
  for (let key of Object.keys(orginObject)) {
    newObject[key] = deepcopy(orginObject[key]);
  }
  return newObject;
};
const copyOfDepthArray = (orginArray) => {
  const newArray = []
  for (let index in orginArray) {
    newArray[index] = deepcopy(orginArray[index]);
  }
  return newArray;
};
const copyOfDepthSet = (orginSet) => {
  const newSet = new Set()
  for (let value of orginSet) {
    newSet.add(deepcopy(value));
  }
  return newSet;
};
const copyOfDepthMap = (originMap) => {
  const newMap = new Map()
  for (let [key, value] of originMap) {
    newMap.set(key, deepcopy(value));
  }
  return newMap;
};



module.exports={deepcopy,isPrimitiveType}