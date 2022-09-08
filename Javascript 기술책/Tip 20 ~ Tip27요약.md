# 화살표 함수로 단순하게 만들어라 

~~~ js

function formatUser(name){
    return `${capitalize(name)}님이 로그인했습니다.`
}

//화살표 함수 사용 예
const formatUser = name => `${capitalize(name)}님이 로그인했습니다.`

function applyCustomGreeting(name,callback){
    return callback(capitalize(name))
}

// 
applyCustomGreeting('mark',name=>`hello ${name}`)

~~~

# 배열메소드로 반복문을 짧게 작성해라 
- 자바스크립트에서는 for문보단 자바스크립트의 배열 메서드를 이용하면 간결하고 예측가능한코드를 만들수있다
~~~ js
const prices=['1.0','negotiable','2.15'];
const formattedPrices=[];
for(let i=0;i<prices.length;i++){
    const price=parseFloat(prices[i])
    if(price){
        formattedPrices.push(price)
    }
}
// 위에 있는거를 map 메소드를 활용하면 아래 같이 표현할수있다.
const prices=['1.0','negotiable','2.15'];
const formattedPrices=prices.map(price=>parseFloat(price)) 
// map을 사용하면 새로운 배열을 반환함
// 예측가능해짐 , 가독성 좋아짐 , 코드가 단순해짐 
~~~

# map() 메소드로 비슷한 길이의 배열을 생성하라

- map 메소드를 사용하면 새로운 배열을 반환하므로 배열을 준비할 필요가없음
  - 즉 원본 배열에서 필요한 정보를 꺼내서 새로운 배열로 생성할수도있음
  

~~~ js
const instruments=band.map(member=>member.instrument)
~~~

# filter 와 find를 데이터의 부분집합을 생성하라
- filter메소드로 조건에따라 배열의 일부값을 반환 , 무조건 참값만 반환한다

~~~js
// filter 메소드 사용예시

function getPerfectScores(scores){
    const perfect=scores.filter(score=>score===100)
    return perfect.length
}
~~~
- find메소드는 배열에 조건과 일치하는 항목이 최대 하나가 필요할경우 사용한다
- find메소드는 참 또는 거짓 값을 반환하는 함수로 인자로 받는다. 참값을 반환하는 항목이없다면 undefined를 반환한다.
  - 조건이 맞지 않을떄 filter메소드를 사용하면 빈배열을 반환하지만 , find메소드를 사용하면 undefined를 반환하여 반환값을 확신하기 어려움

~~~js
const librarian=instructors.find(instructor =>{
    return instructor.libraries.includes('기념 도서관')
})
~~~

# forEach()로 동일한 동작을 적용하라
- forEach 함수의 유효범위 밖에 있는 모든 함수 외부에 영향을 준다 
- 배열내부의 값을 변환시켜 부수효과를 발생시킨다. for문대신 배열을 탐색할떄 사용하는것을 추천 

~~~ js
const name=['walter','white']
const capitalized=name.forEach(name=>name.toUpperCase())
// name 배열내부의 값을 변환시켜 부수효과를 발생시킴 => map으로 대체하는게좋음

~~~

# 체이닝으로 메서드를 연결하라
- 값을 다시 할당하지 않고 반환된 객체에 메서드를 즉시 호출하는 것을 의미한다
  - 여러개의 배열 메서드에서 배열이 반환 될떄 , 배열 메서드를 연이어 호출
- 새로운 메서드를 호출할 때마다 반환된 배열전체를 다시 반복하는 단점이있음 (대규모 데이터를 다룰때는 성능문제도 존재)

~~~ js
// 체이닝 예시 
sailors.filter(sailor=>sailor.active)
.map(sailor=>sailor.email || `${sailor.name}@wiscsail.com`)
.forEach(sailor => sendEmail(sailor))

~~~
# reduce()로 배열 데이터를 변환하라
- reduce는 배열을 이용해서 다른 새로운 데이터를 만들거나 , 특정항목의수가 필요할때사용
- reduce는 배열의길이와 데이터 형태를 변경할수있어서 좋음 
- reduce는 반드시 배열을 반환할 필요가 없음
- 콜백함수에서 항상 누적된 값을 반환해야함 (누적값을 반환하지 않으면 값이 사라지기 떄문에 )

~~~js
reduce(콜백함수,기본값) // 콜백함수에는 4개의인자 존재 => accumulator , current value ,current Idx,array

const colors=dogs.reduce((colors,dog)=>{
    return [...colors,dog['색상']]
},[])

const sum = [1, 2, 3, 4, 5].reduce((acc,cur) => {
    return acc+cur
}, 0)

~~~

# for ... in 문과 for ... of 문으로 반복문을 정리하라 
- for ... of문을 통해 이터레이터 객체를 존재하는것을 순회할수있음 
  - 단 배열메소드를 사용할수있는경우 배열메소드를 우선순위로 잡아라 

- for ... of 에서의 Object 에서의 동작
~~~ js
for(const firm of firms){
    const [id,name]=firm // key value 둘다 가져옴 
    if(!isValid(id)){
        return `${name}은 사용할수 없습니다.`
    }
}
~~~
- for ... in 에서의 Object 에서의 동작
 
~~~ js
for(const id in firms){
    // id= key 키만 가져옴 
    if(!isValid(id)){
        return `${name}은 사용할수 없습니다.`
    }
}
~~~

