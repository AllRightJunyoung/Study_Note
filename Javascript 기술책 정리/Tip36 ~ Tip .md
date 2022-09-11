# 화살표 함수로 문맥 혼동을 피해라
- 화살표함수는 상위스코프를 가리키고 있으므로 this바인딩 문제점을 쉽게해결 (명시적 바인딩으로도 해결가능 )
- this는 호출 대상에 따라 정해짐  
~~~ js
const validator = {
    message: '는 유효하지 않습니다',
    setInvalidMessage(field) {
        return `${field}${this.message}`
    }
}
console.log(validator.setInvalidMessage('도시')) //도시는 유효하지 않습니다 출력
// 여기서의 this는 validator 객체가 된다 

// this 바인딩 문제점 
const validator = {
    message: '는 유효하지 않습니다',
    setInvalidMessage(...fields) {
        return fields.map(function (field) { //여기서의 this는 전역객체가 된다  함수로서 호출했으므로 
            return `${field}${this.message}`
        })
    }
}

// 위 문제점 해결 

const validator = {
    message: '는 유효하지 않습니다',
    setInvalidMessage(...fields) {
        return fields.map(field => { //여기서의 this는 상위스코프를 가리키므로  validator가 된다.
            return `${field}${this.message}`
        })
    }
}
~~~

# Tip 42 bind() 로 문맥 문제를 해결하라 

~~~js
class Validator{
    constructor() {
        this.message='가 유효하지 않습니다.'
    }
    setInvalidMessgae(field) {
        return `${field}${this.message}`
    }
    setInvalidMessages(...fields) {
        return fields.map(this.setInvalidMessages) //여기서는 Window가 this가 되는문제발생
    } 

}

// 위에 문제점 해결 1

class Validator{
    constructor() {
        this.message='가 유효하지 않습니다.'
    }
    setInvalidMessgae(field) {
        return `${field}${this.message}`
    }
    setInvalidMessages(...fields) {
        return fields.map(this.setInvalidMessages.bind(this)) //명시적 바인딩 사용
    } 

}

// 위에 문제점 해결 2
class Validator{
    constructor() {
        this.message = '가 유효하지 않습니다.'
        this.setInvalidMessgae=this.setInvalidMessgae.bind(this)
    }
    setInvalidMessgae(field) {
        return `${field}${this.message}`
    }
    setInvalidMessages(...fields) {
        return fields.map(this.setInvalidMessgae)
    } 

}
~~~