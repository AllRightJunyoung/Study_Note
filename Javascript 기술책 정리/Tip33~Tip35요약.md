# Tip 33 화살표 함수로 복잡도를 낮춰라
- 코드 예시 1 (객체의 속성을 인자로 받음)
~~~js
const name = {
    first: 'Lemy',
    last: 'killer',
    city: 'Seoul',
    state:'hello'
}


function getName({first,last}) {
    return `${first} ${last}`
}

//화살표 함수 사용 
const getName=({first,last})=>`${first} ${last}`
~~~

- 코드예시 2 (객체의 속성을 인자로 받고  객체 반환함 )
~~~js
const obj = {
    first: 'Lemy',
    last: 'killer',
    city: 'Seoul',
    state:'hello'
}

// 화살표함수 사용하기전 
function getName({ first, last,city,state }) {
    return {
    fullName: `${first} ${last}`,
    location:`${city} ${state}`    
    }
}
// 사용후 
const getName = ({ first, last,city,state }) => ({
    fullName: `${first} ${last}`,
    location:`${city} ${state}`
})
console.log(getName(obj))
// {fullName: 'Lemy killer', location: 'Seoul hello'}
~~~

- 고차함수를 화살표함수로 간단하게 
 - 고차함수 : 함수를 인자로 전달받거나 함수를 결과로 반환하는 함수 (클로저개념이용)

~~~js
const discounter = discount => {
    return price => {
        return price *(1-discount)
    }
}
// 화살표 함수 사용 예
const discounter=discount=>price=>price*(1-discount)
const tenPercentOff = discounter(0.1)
~~~

# Tip 34 부분적용함수를 단일책임 매개변수로 관리하라 
- 부분적용함수를 사용안한예시
~~~js
const building = {
    hours: '8 a.m - 8 p.m',
    address:'Jayhawk Blvd'
}
const manager = {
    name: 'Augusto',
    phone:'555-555-5555'
}
const program = {
    name: 'Presenting Research',
    room: '415',
    hours:'3-6'
}
const exhibit = {
    name: 'Emerging Scholarship',
    contact:'Dyan'
}

function mergeProgramInformation(building, manager, event) {
    const { hours, address } = building
    const { name, phone } = manager
    const defaults = {
        hours,
        address,
        contact: name,
        phone
    }
    return {...defaults,...event}
}
// 아래의 함수호출은 중복된 두개의 인자를 가지고있음 => 부분적용함수로 변환해보자 
const programInfo = mergeProgramInformation(building, manager, program)
const exhibitInfo=mergeProgramInformation(building,manager,exhibit)
~~~

- 부분적용 함수로 변환한  예시 
~~~ js
const building = {
    hours: '8 a.m - 8 p.m',
    address:'Jayhawk Blvd'
}
const manager = {
    name: 'Augusto',
    phone:'555-555-5555'
}
const program = {
    name: 'Presenting Research',
    room: '415',
    hours:'3-6'
}
const exhibit = {
    name: 'Emerging Scholarship',
    contact:'Dyan'
}

function mergeProgramInformation(building, manager) {
    const { hours, address } = building
    const { name, phone } = manager
    const defaults = {
        hours,
        address,
        contact: name,
        phone
    }
    return program => {
        return {...defaults,...program}
    }
} 
const programInfo = mergeProgramInformation(building, manager)(program)
const exhibitInfo = mergeProgramInformation(building, manager)(exhibit)
~~~

- 부분적용함수를 이용한 배열 결합 
~~~js
const birds=['meadowlark','robin','roadrunner']
const zip = (...left) => (...right) => {
    return left.map((item,i)=>[item,right[i]])
}
console.log(zip('kansas', 'wisconsin', 'new mexico')(...birds))
// 0 : ['kansas','meadowlark'] , 1: ['wisconsin','robin'] , 2:['new mexico','roadrunner']
~~~

# 커링과 배열 메서드를 조합한 부분 적용 함수를 사용하라
- 고차 함수를 사용하면 한번 저장한 후 나중에 사용할 수 있는 새로운 함수를 만들어서 반복을 피할수있음
  - 즉 default값으로 정하면 새로운 함수를 만들 필요없음

- 커링함수 : 한번에 인수를 하나만 받는 함수이다 

- 커링함수를 이용해서 개선한 코드 
~~~js
// 함수내에 객체의 property를 늘리고 parameter를 줄임 
const setStrongHallProgram = program => {
    const defaults = {
        hours: '8 a.m - 8 p.m',
        address: 'Jayhawk Blvd',
        name: 'Augusto',
        phone:'555-555-5555'
    }
    return {...defaults,...program}
}

//커링함수를 이용해서 개선한 코드
const programInfo = setStrongHallProgram(program)
const exhibitInfo = setStrongHallProgram(exhibit)
~~~

- 커링함수 활용예시 

~~~ js

const dogs = [
    {
        이름: '맥스',
        무게: 10,
        견종: '보스턴테리어',
        지역: '위스콘신',
        색상:'검정색'
    },
    {
        이름: '도니',
        무게: 90,
        견종: '래브라도레트리버',
        지역: '캔자스',
        색상:'검정색'
    },
    {
        이름: '새도',
        무게: 40,
        견종: '래브라도레트리버',
        지역: '위스콘신',
        색상:'갈색'
    }
]

const weightCheck = weight => dog => dog['무게'] < weight
function getDogNames(dogs, filterFunc) {
    return dogs.filter(filterFunc).map(dog=>dog['이름'])
}
console.log(getDogNames(dogs,weightCheck(20)))


// 개선 1 : 특정 조건 기준으로 반환  
// 여러 조건이 오게 반환할수는 없을까?
// dogfiled 에 맞게 dog를 반환하는 함수인 identity를 만듬 
const identity=field=>value=>dog=>dog[field]===value
const colorCheck = identity('색상')
const stateCheck=identity('지역')
    
function getDogNames(dogs, filterFunc) {
    
    // 1. field = 색상 , value=갈색 ,dog= dogsObject
    // 2. 해당 dog의 이름을 반환 
    return dogs
        .filter(filterFunc)
        .map(dog => dog['이름'])
}
console.log(getDogNames(dogs, colorCheck('갈색'))) //새도
console.log(getDogNames(dogs, stateCheck('캔자스'))) //도니


// 위 코드는 각 property당 하나씩 원하는 Object를 반환할수밖에 구성되어있음
// 개선 2: 여러 property 조건에 해당되는 Object 반환 


const identity=field=>value=>dog=>dog[field]===value
const colorCheck = identity('색상')
const stateCheck=identity('지역')
    
function allFilters(dogs, ...checks) {
    return dogs
    .filter(dog => checks.every(check => check(dog)))
    .map(dog=>dog['이름'])
}
console.log(allFilters(dogs, colorCheck('검정색'),stateCheck('캔자스'))) // 검정색과 캔자스를 만족하는 개를 가져옴

~~~
