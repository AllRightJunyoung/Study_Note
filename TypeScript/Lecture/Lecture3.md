# 함수에 단위로 타입 지정하기

~~~ ts
type Add=(a:number,b:number)=>number

const add:Add=(a,b)=>a+b

~~~

# 타입을 사용한 오버로딩 활용예시 1
~~~ts
type Add={
    (a:number,b:number):number
    (a:number,b:number,c:number):number
}
const add:Add=(a,b,c?:number)=>{
    if(c) return a+b+c
    return a+b
}

add(1,2)
add(1,2,3)
type Config={
    path:string,
    state:object
}
type Push={
    (path:string):void
    (config:Config):void
}
const push:Push=(config)=>{
    if(typeof config ==="string"){
        console.log(config)
    }
    else{
        console.log(config.path,config.state)
    }
}
~~~


# 타입을 사용한 오버로딩 활용예시 2

~~~ ts
type SuperPrint={
    (arr:number[]):void
    (arr:boolean[]):void
    (arr:string[]):void
    (arr:(number|boolean)[]):void
}

const superPrint:SuperPrint=(arr)=>{
    arr.forEach(i=>console.log(i))
}
superPrint([1,2,3,4])
superPrint([true,false,true])
superPrint(['a','b','c'])
superPrint([1,2,true,false])

// Generic 문법 사용하면 편해짐

type SuperPrint={
    <T>(arr:T[]):T
}


~~~

