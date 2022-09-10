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

// 펼침연산자사용 응용편

const tmp = {
    location: {
        city: 'Hobbs',
        county: 'Lea',
        state: {
            name: 'New Mexico',
            abbreviation: 'NM'
        }
    },

    title:'Landscape',
    photographer:'Nathan',
}


function getCityAndState({ location, ...details }) {
    const { city, state } = location
    return {
        city,
        state: state.abbreviation,
        ...details,
    }
}
console.log(getCityAndState(tmp)) 
// {city: 'Hobbs', state: 'NM', title: 'Landscape', photographer: 'Nathan'}

~~~

# 나머지 매개변수로 여러개의 인수를 변수로 전달하라
- 전체 매개변수를 알수없는 비슷한 매개변수들을 처리하는방법
  - 단점 : 마지막인자로 무조건 들어가야됨 

~~~js

function validateCharacterCount(max,items){
    return items.every(item=>item.length<max)
}
validateCharacterCount(10,['Hobbs','Eagels'])

// 위코드의경우 인자를 배열형태로 안보내면 타입 에러가 발생함
validateCharacterCount(10,'wwww') //TypeError

// 아래와 같은 방법으로 arguments를 배열로 변환하여 해결이 가능하나 
// 펼침연산자를 쓰면 더 쉽게 해결할수있다 
function validateCharacterCount(max){
    const items=Array.prototype.slice.call(arguments,1)
    return items.every(item=>item.length<max)
}

// 개발자가 프로그램을 유지보수할시 인자값을 몰라도 쉽게 예측가능해짐
function validateCharacterCount(max,...items){
    return items.every(item=>item.length<max)
}



~~~