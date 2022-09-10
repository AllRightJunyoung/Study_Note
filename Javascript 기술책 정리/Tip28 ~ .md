# 매개변수 기본값을 생성하라
- 자바스크립트는 타입스크립트와 달리 매개변수가 TypeError를 체크하지 않음 (undefined 에러발생)
  - 매개변수에 default값을 설정하여 해결가능

~~~js
function convertWeight(weight,ounces,roundTo){
    // 단락평가 사용
    const oz=ounces/16 || 0;
    const total=weight+oz
    const conversion =total/2.2
    // roundTo값이 undefined 일경우 삼항연산자로 체크
    const round = roundTo === undefined ? 2: roundTo;
    return roundToDecimalPlace(conversion,round)
}
// default parameter 추가 
function convertWeight(weight,ounces=0,roundTo=2){
    const total=weight+(ounces/16)
    const conversion =total/2.2
        return roundToDecimalPlace(conversion,round) 
}
~~~

# 해체 할당으로 객체 속성에 접근하라
- 맵에는 적용 불가
- 키 값 쌍 또는 클래스의 인스턴스 객체에서만 사용가능
- 객체의 key값이 많은 속성들에 적용하기 쉬움 
~~~js
const landscape={
    photograhper:'Nathan'
}
const {photograhper}=landscape
// Nathan 

// 해체 할당으로 원하는 변수명 지정하기 (객체에 적용)
const landscape={
    src:'/landscape-nm.jpg'
}
const {src:url}=landscape
console.log(url)
// landscape-nm.jpg


//해체 할당으로 원하는 변수명 지정하기 2(배열에 적용)
const landscape={
    location:[32.33333,-103.23423]
}

const {location:[latitude,longitude]}=landscape
console.log(latitude,longitude) // 32.33333,-103.23423

// 펼침연산자사용

const landscape={
    a:'1',
    b:'2',
    c:'jpg'
}
const {a,...additional}=landscape
console.log(additional) // {b:2 ,c:'jpg}

~~~

# 키-값 할당을 단순화 하라
~~~js
const region={
    city:'Hobbs',
    county:'Lea'
    state:{
        name:'New Mexico',
        abbreviation:'NM'
    }
}
function getCityAndState({location}){
    const {city,state}=determineCityAndState(location)
    return{
        city,
        state:state.abbreviation
    }
}

// 펼침연산자사용 


const region={
    city:'Hobbs',
    county:'Lea'
    state:{
        name:'New Mexico',
        abbreviation:'NM'
    }
}

const landscape={
    title:'Landscape',
    photographer:'Nathan',
}

function getCityAndState({location,...details}){
    const {city,state}=determineCityAndState(location)
    return{
        city,
        state:state.abbreviation
        ...details,
    }
     //details에는 landscape의 정보가 들어감
     //출력 결과

}

~~~