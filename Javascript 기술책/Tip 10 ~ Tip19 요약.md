# 객체를 이용해 정적인 키-값을 탐색해라

- 객체는 변화가 없고 구조화된 키-값 데이터를 다루는데 유용
 - 자주 갱신되거나 실행되기전에 알수없는 동적인 정보를 다루기엔 적합하지않음
- 객체를 해제할당 시켜 데이터를 쉽게 다룰수있음 
~~~js
// 색깔 표현같은 정적인 정보표현
const colors={
    red:'#d10202',
    green:'#19d836',
    blue:'#0e33d8'
}

// 설정파일
const config{
    endpoint:'http://pragprog.com',
    key:'secretkey'
}
~~~
# Object.assgin()으로 조작없이 객체를 생성하라

- 객체도 참조형 데이터 이므로 언제든지 부수효과로 인한 문제에 직면할수있음
  - Object.assgin()을 이용하면 새로운 객체를 얕은복사할수있음 (중첩객체는 완벽히 복사 못함)

~~~js

const defaults={
    author:'',
    title:'',
    year:2017,
    rating:null
}
const book={
    author:'Joe Morgan',
    title: 'Simplifying Javscript'
}

// const updated=Object.assign(defaults,book) default값에도 영향을 미침 

const updated=Object.assgin({},defaults,book)
~~~

# 객체 펼침 연산자를 정보를 갱신하라
- Object.assgin()을 사용하는것 보다 간결하게 쓸수있음 
- 펼침연산자도 얕은복사만 가능함 

~~~js
const book={
    title:'Reason and Persons',
    author:'Derek Parfit'
}
const update={...book,year:1984} // {title:'Reason and Persons', author: 'Derek Parfit',year:1984}

~~~

# 맵으로 명확하게 키-값 데이터를 갱신하라
- map을 사용하면 key-value 데이터가 주어졌을때 정확히 어떠한처리를 하는지 식별이 쉽다.
- 맵 이터레이터를 이용하여 데이터가 순회가 가능해짐 


# 맵과 펼침 연산자를 키-값 데이터를 순회하라
- 맵 이터레이터가 존재하여 배열로 변환가능 
~~~js
function getAppliedFilters(filters){
    const applied=[...filters].map(([key,value])=>{
        return `${key}:${value}`
    })
    return `선택한 조건은 ${applied.join(',')}입니다.`
}

function getAppliedFilters(filters){
    const applied=[...filters].sort((sortByKey)).map(([key,value])=>{
        return `${key}:${value}`
    })
    return `선택한 조건은 ${applied.join(',')}입니다.`
}
~~~

# Set을 이용 하여 고유값을 관리해라
- Set은 중복된 값을 저장시키지않음

~~~ js
const colors=['검정색','갈색','검정색']
const unique=new Set(colors)
// Set {'검정색','갈색'}

function getUniqueColors(dogs){
    const unique=new Set()
    for(const dog of dogs){
        unique.add(dog.색상)
    }
    return [...unique]
}
~~~

# 거짓 값이 있는 조건문을 축약하라
- 거짓값 예시
~~~ js
false,null,0,NaN,'',""
~~~
- Object와 Map에서는 정의되지 않는 키값을 가져오면 undefined를 발생시키는데 이를 해결하는방법은있을까?
  - 엄격한 일치를 이용해서 값이 있는지 확인해바라 (불리언 이용)
  ~~~js
  function check(is){
      if(is.check !==true){

      }
  }

  ~~~

# 삼항 연산자로 빠르게 데이터를 확인하라
- if else 문과 다르게 코드가 간결해지고 가독성이 좋아진다.
  - 과도한 삼항연산자는 매우 안좋음 (차라리 if else문을 사용)
~~~js
const permissons= title==='과장' ? ['근로시간','수당'] : ['근로시간']

~~~

# 단락 평가를 이용해라 
- 조건문을 좀 더 간소하게 표현 가능해짐
- || (or 연산자) (둘중 하나라도 참이어야 동작), && 연산자 (둘다 참이어야 동작)


~~~ js
// ex 1 : || 예제
function getIconPath(icon){
    const path=icon.path ? icon.path : 'uploads/default.png';
    // 단락평가로 간소화
    const path=icon.path || 'uploads/default.png';
}

// ex 2 : && 예제 
function getImage(userConfig){
    const images=userConfig.images;
    return images && images.length ? images[0] : 'default.png';
}




~~~

