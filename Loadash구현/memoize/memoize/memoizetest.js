const isFun = (func) => {
    if (typeof func !== 'function') {
        return false
    }
    return true
}

const memoizeTest=(func) => {
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

function factorial(num) {
    console.log(num)
    if (num === 1) {
        return num
    }
    return num*factorial(num-1)
}

const a=memoizeTest(factorial)
console.log(a(5))
console.log(a(5))
