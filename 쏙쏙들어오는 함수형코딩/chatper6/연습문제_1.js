var a = [1, 2, 3, 4]
var b = a.pop()
// console.log(b) //4
// console.log(a)  //[1,2,3]

// 1. 읽기와 쓰기 함수로 분리하기

function read(array) {
    return array
}
function pop(array) {
    let new_array=[...array]
    return new_array.pop()
}
var a = [1, 2, 3, 4]
var b = pop(a)
console.log(read(b))

// 2. 값 두개를 리턴하는 함수로 만들기
function pop(array) {
    let new_array = [...array]
    let elem=new_array.pop()
    return {
        array: new_array,
        element:elem
    }
}


