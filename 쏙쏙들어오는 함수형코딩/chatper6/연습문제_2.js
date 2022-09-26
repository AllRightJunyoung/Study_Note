// 푸시 함수 카피온 라이트 버전으로 만들기
function push(array, elem) {
    let new_array = [...array]
    new_array.push(elem)
    return new_array
}


// 연습문제 2-2
function add_contact(mailing_list, email) {
    var list_copy = [...mailing_list]
    list_copy.push(email)
    return list_copy
}

function add_contact(mailing_list, email) {
    return push(mailing_list, email)
    
}

// 연슨문제 2-3

a[15] = 2
function arraySet(array, idx, value) {
    let new_array = [...array]
    new_array[idx] = value
    return new_array
}
