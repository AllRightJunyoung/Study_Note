# 액션에서 계산을 뺴는 방법
> 함수형 프로그래밍은 테스트하기 쉽고 재사용성이 좋은 코드를 만들어야함

1. 시나리오 1 (홈쇼핑 페이지)
~~~js
var shopping_cart=[]
var shopping_cart_total=0

function add_item_to_cart(name,price){
    shopping_cart.push({
        name:name,
        price:price
    })
    // 카드 안에 들어 있는 물건계산
    cal_cart_total() 
}

function calc_cart_total(){
    shopping_cart_total=0
    for(var i=0;i<shopping_cart.length;i++){
        var item=shopping_cart[i]
        shoping_cart_total+=item.price
    }
    // 금액합계를 돔에 업데이트
    set_cart_total_dom()
    // 무료배송가능한지에 대한 아이콘을 Dom에 업데이트
    update_shipping_icons()

    // 세금 계산한것을 돔에 업데이트
    update_tax_dom()
}
절차적인 방법으로 구현하기
function update_shipping_icons(){
    // 1. dom에 있는 버튼을 가져옴 
    var buy_buttons=get_buy_buttons_dom()
    for(var i=0;i<buy_buttons.length;i++){
        var button=buy_buttons[i]
        var item= button.item
        // 2. 무료 배송이 가능하면 아이콘 보여줌 , 아니면 숨김
        if(item.price+shopping_cart_total>=20){
            button.show_free_shipping_icon()
        }
        else{
             button.hide_free_shipping_icon()    
        }
    }
}

// 세금 계산한것을 돔에 업데이트
function update_tax_dom(){
    set_tax_dom(shopping_cart_total *0.10)
}

~~~
- 위코드의 문제점 (절차적인 방식의 구현 단점)
> 테스트코드 케이스들이 너무많다.
1. 브라우저 설정
2. 페이지로드
3. 장바구니에 제품 담기버튼
4. DOM이 업데이트 될때까지 기다려야함
5. DOM에서 값 가져오기
6. 가져온 문자열 값을 숫자로 바꿈
7. 예상하는값과 비교

개선방안?
- DOM 업데이트와 비즈니스 로직이 분리되어야함
- 전역변수가 없어야함 

## 재사용하기 쉽게 만들기
~~~ js
문제되는 코드 분석
1. shipping_cart_total은 전역변수에 존재하여 값이 있어야만 실행가능 (여러팀에서 해당 변수를 사용할경우 문제됨)
2. DOM이 존재해야만 실행이가능한코드 (buy_button)
function update_shipping_icons(){
    var buy_button=get_buy_buttons_dom()
    for(var i=0;i<buy_buttons.length;i++){
        var button=buy_buttons[i]
        var item=button.item
        if(item.price+shipping_cart_total>=20){
            button.show_free_shipping_icons()
        }
        else{
            button.hide_free_shipping_icons()
        }
    }
}
~~~
- 대안점
1. 전역변수에 의존 x
2. DOM을 사용할수있는곳에서 실행된다고 가정x
3. 함수가 결과값을 리턴해야함


## 액션과 계산 데이터를 분리하기
- 아래 코드를 통해 액션이 몇개인지 확인해보자
~~~ js

var shopping_cart=[] // 액션 (전역변수)
var shopping_cart_total=0 // 액션 (전역변수)

function add_item_to_cart(name,price){
    shopping_cart.push({ // 액션 (전역변수를 변경)
        name:name,
        price:price
    })
    cal_cart_total()  
}

function update_shipping_icons(){
    var buy_buttons=get_buy_buttons_dom()     // 1. dom에 있는 버튼을 가져옴 액션
    for(var i=0;i<buy_buttons.length;i++){
        var button=buy_buttons[i]
        var item= button.item
        // 2. 무료 배송이 가능하면 아이콘 보여줌 , 아니면 숨김 (DOM요소를 바꾸기에 액션이다)
        if(item.price+shopping_cart_total>=20){
            button.show_free_shipping_icon() 
        }
        else{
             button.hide_free_shipping_icon()
        }
    }
}

function calc_cart_total(){ // 액션 (DOM에서 읽기에)
    shopping_cart_total=0 //전역변수사용 액션
    for(var i=0;i<shopping_cart.length;i++){
        var item=shopping_cart[i]
        shoping_cart_total+=item.price
    }
    // 금액합계를 돔에 업데이트
    set_cart_total_dom()
    // 무료배송가능한지에 대한 아이콘을 Dom에 업데이트
    update_shipping_icons()

    // 세금 계산한것을 돔에 업데이트
    update_tax_dom()
}

// 세금 계산한것을 돔에 업데이트 (액션)
function update_tax_dom(){
    set_tax_dom(shopping_cart_total *0.10)
}
~~~


## 입력과 출력은 명시적이거나 암묵적일수 있다
> 함수에 암묵적 입력과 출력 (부수효과) 이 있으면 액션이 된다 => 없애면 계산이됨
~~~ js
var total=0
function add_to_total(amount){  
    console.log(total) //암묵적 입력 (전역변수) , 암묵적 출력(콘솔에 찍는것)
    total+=amount // 전역변수 변경 (암묵적 출력)
    return total // 명시적 출력
}
~~~


## 암묵적 출력과 입력인 액션을 계산으로 빼내기 (코드예시)
- 코드예시 1
~~~ js

1. 암묵적 출력을 없애기 
function calc_cart_toal(){
    calc_total() 
    set_cart_total_dom()
    update_shipping_icons()
    update_tax_dom()
}

function calc_total(){
    shopping_cart_total=0
    for(var i=0;i<shopping_cart.length;i++){
        var item=shopping_cart[i]
        shopping_cart_total+=item.price
    }
}

function calc_cart_toal(){
    shopping_cart_total=calc_total() //리턴 값을 받아 전역변수에 할당
    set_cart_total_dom()
    update_shipping_icons()
    update_tax_dom()
}


function calc_total(){ 
    var total=0
    for(var i=0;i<shopping_cart.length;i++){
        var item=shopping_cart[i]
        total+=item.price
    }
    return total
}
개선된 부분을 보면 전역변수를 변경시키는 암묵적 출력을 사라지게했다 지역변수로 이를 해결

더 나아가 암묵적 입력까지 지워보자 !!

function calc_cart_toal(){
    shopping_cart_total=calc_total(shopping_cart) // 전역변수를 인자로전달
    set_cart_total_dom()
    update_shipping_icons()
    update_tax_dom()
}

function calc_total(cart){  //전역 변수 대신 인자를 만들어서 사용하자
    var total=0
    for(var i=0;i<cart.length;i++){
        var item=cart[i]
        total+=item.price
    }
    return total
}
~~~

2. 코드예시 2
~~~ js

1. 암묵적 입력을 없애보자 (전역변수)
function add_item_to_cart(name,price){
    add_item(name,price);
    calc_cart_total();
}
function add_item(name,price){
    shopping_cart.push({
        name:name,
        price:price
    })
}

// 암묵적 입력을 지우기
function add_item_to_cart(name,price){
    add_item(shopping_cart,name,price);
    calc_cart_total();
}
function add_item(cart,name,price){
    cart.push({
        name:name,
        price:price
    })
}

암묵적 입력은 지웠지만 암묵적 출력을 없애보자 ! 
function add_item_to_cart(name,price){
    shopping_cart=add_item(shopping_cart,name,price);
    calc_cart_total();
}
// 배열 복사기법
function add_item(cart,name,price){
    var new_cart=cart.slice()
    new_cart.push({
        name:name,
        price:price
    })
    return new_cart
}
~~~

## 액션에서 계산으로 추출하는 과정

1. 빼낼 코드를 찾아내고 코드를 추출해서 리팩토링함 (새 함수)
2. 새 함수에 암묵적 입력과 출력을 찾음 
- 암묵적 입력 : 함수를 부르는 동안 결과에 영향을 줌 
- 암묵적 출력 : 함수 호출의 결과로 영향을 받는것
3. 암묵적 입력은 인자로 , 암묵적 출력은 리턴값으로 받음

## 챕터 정리
1. 액션은 암묵적 입력 과 출력을 가지고있는데 이를 빼내면 게싼이된다
2. 공유변수(전역변수)는 일반적으로 암묵적 입력 또는 출력이 된다.
3. 암묵적 입력은 인자로 바꿀수있다
4. 암묵적 출력은 리턴값으로 바꾼다

