o["price"] = 37

function objectSet(object, key, value) {
    let new_object = Object.assign({}, object)
    new_object[key]=value
}
function setPrice(item, new_price) {
   return objectSet(item,"price",new_price)
}


function objectDelete(object, key) {
    var copy = Object.assign({}, object)
    delete copy[key]
    return copy
}