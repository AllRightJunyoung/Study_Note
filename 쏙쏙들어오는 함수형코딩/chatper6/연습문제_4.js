function setQuantityByName(cart, name, quantity) {
    for (var i = 0; i < cart.length; i++){
        if (cart[i].name === name) {
            cart[i].quantity=quantity
        }
    }
}

function objectSet(object, key, value) {
    let new_object = Object.assign({}, object)
    new_object[key] = value
    return new_object
}
// 중첩된 복사버전
function setQuantityByName(cart, name, quantity) {
    let copy_object = Object.assign({}, cart)
    for (var i = 0; i < copy_object.length; i++){
        if (copy_object[i].name === name) {
            copy_object[i]=objectSet(copy_object[i],name,quantity)
        }
    }
    return copy_object

}