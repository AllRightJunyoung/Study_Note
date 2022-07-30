# Memoize 란?
- loadash에 있는 메소드

- 첫번쨰로 인자가 들어간다.

- 동일한 결과 값을 가진 함수를 재사용할때 사용한다.
  - 재귀함수 호출시 나오는 결과값 , 동일한값을 사용하는 정렬할때 유용

- 공간복잡도가 커짐 (메모리낭비) , 속도는 개선 됨

~~~ js

const isFun = (func) => {
    if (typeof func !== 'function') {
        return false
    }
    return true
}

const memoize=(func) => {
    if (!isFun(func)) {
       throw new TypeError('올바르지 않은 타입 입니다. ')
    } 
    // 클로저 이용
    const cache=new Map()
    return function () {
        const name = JSON.stringify(arguments)
        if (cache.has(name)) {
            return cache.get(name)
        }
        // 2 해당 key가 존재하지 않으면
        else {
						//실행결과를 저장
            const result=func.apply(this,arguments)
            cache.set(name, result)
            return result
        }

    }
}
~~~

