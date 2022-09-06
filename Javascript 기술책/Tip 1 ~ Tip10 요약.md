# const를 이용하여 변하지 않는 값을 표현해라

-  const 선언후 재할당이 불가능하다 
- 변수선언시 우선순위를 1.const 2.let 으로 둬라 (var는 사용 하지 마라)
~~~ js
// 예시

// const 로 선언함으로써 변경이 되지 않은 변수임을 알수있게되며 
const taxRate= 0.1;
const shipping=5.00;
let total=100+(100*taxRate) + shipping


~~~
# let과 const를 사용하여 유효범위를 줄여라
- let과 const로 선언할경우 블록스코프의 유효범위를 따른다.
- 같은 이름의 변수를 다시 선언할수없다 

~~~ js
// 예시

// var로 선언할경우는 함수 스코프의 유효범위를 따르게 되고 같은 이름의 변수를 다시 선언할수없다 
function getLowestPrice(item){
    var count=item.inventory;
    var price=item.price;
    // item.saleInventory값이 0이 되면 count값은 0이 되어 원하지않는 결과가나온다.  => let으로 바꿔줘면 해결이가능하다
    if(item.salePrice){
        var count=item.saleInventory;
        if(count>0){
            price=item.salePrice
        }
    }
    if(count){
        return price
    }
    return 0
}

~~~

# 블록 유효 범위 변수로 정보를 격리하라
~~~js
function addClick(items){
    for(var i=0;i<items.length;i++){
        items[i].onClick=function(){
            return i
        }
    }
    // i는 items.length-1의 마지막값이 되는 문제가 발생함
    return items
}
// 위와 같은 문제는 클로저를 사용해서 해결가능하나 let으로 블록 유효범위로 가두면 아래와 같이 쉽게 해결이가능함 

function addClick(items){
    for(let i=0;i<items.length;i++){
        items[i].onClick=function(){
            return i
        }
    }
    return items
}

~~~

# 템플릿 리터럴로 변수를 읽을수 있는 문자열로 변환해라 
- 템플릿 리터럴로 표현하면 쉽게 표현이가능하다.

~~~js
function generateLink(image,width){
    const widthInt=parseInt(width,10)
    return 'https://' +getProvider()+'/'+image+'?width='+widthInt;
}

// 템플릿 리터럴 사용해서 직관적인 표현이 가능해짐 
function generateLink(image,width){
    const widthInt=parseInt(width,10)
    return `https://${getProvider()}/${image}?width=${parseInt(width,10)}`;
}
~~~

# 배열로 유연한 컬렉션을 생성하라

- 배열은 순서를 가지고 있어 기준으로 값을 추가 및 제거 할수있고 모든 위치에 있는 값을 확인할수있음
- 배열에는 이터러블이 내장되어 있음 

~~~js
// 정렬시 순서를 보장하는 방법
const team=[
    'Joe',
    'Dyan',
    'Bea',
    'Theo'
]

function alphabetizeTeam(team){
    return [...team].sort()
}

// filter 메소드를 활용

const staff=[{
    name:'hi',
    position:'헬창',
},
{
    name:'Davis',
    position:'엔지니어'
}
]
function getPosition(staff){
    return staff.filter(member=>member.position==='헬창')
} // 해당 값을 가져올수있음

~~~

# Includes()를 존재여부로 확인해라
- 배열에 있는 값이 존재하는지 확인 
- 기존에는 indexof를 사용해서 index가 0번쨰 값이 될경우에 유효성검사에서 문제가 발생했지만 includes메소드를 사용하여 쉽게처리가능

~~~js
const section=['contact','shipping']
section.includes('shipping')

~~~

# 펼침 연산자로 배열을 본떠라

~~~ js

const copyCart=[...cart]
// 원본배열 변경하지 않고 복사 (mutation방지)

// 원본배열을 변경하지않고 item 삭제 (mutation방지) => filter메소드 활용가능
function removeItem(items,removable){
    const index=items.indexOf(removable)
    return [...items.slice(0,index),...items.slice(index+1)];
}

~~~

# push() 메서드 대신 펼침 연산자로 원본 변경을 피하라
- javascript에서는 부수 효과가 없는 함수 인 즉 순수함수를 만들기 위해 노력해야한다 
  - 조작을 피해야한다.
- 펼침연산자로 새로운배열을 생성해서 반환

~~~js
function addFreeGift(cart){
    if(cart.length>2){
        cart.push(reward)
        return cart
    }
    return cart
}
// 원본 배열을 변경한다 


// side Effcet를 피하는 방법  (원본배열 변경x)
function addFreeGift(cart){
    if(cart.length>2){
        return [...cart,reward]
    }
    return cart
}

const title=['Moby Dick','White Teeth']
const moreTitles=[...title,'Hello World']
~~~

# 펼침 연산자를 정렬에 의한 혼란을 피하라 
- 스프레드 문법으로 새로운 배열을 생성하여 정렬을 시키면 순서를 유지할수있다.
~~~ js
[...staff].sort(sortByYears)

~~~
