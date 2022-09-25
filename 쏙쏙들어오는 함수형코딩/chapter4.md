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

function update_shipping_icons(){
    // 1. dom에 있는 버튼을 가져옴 
    var buy_buttons=get_buy_buttons_dom()
    for(var i=0;i<buy_buttons.length;i++){
        var button=buy_buttons[i]
        var item= button.item
        // 무료 배송이 가능하면 아이콘 보여줌 , 아니면 숨김
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
- 위코드의 문제점
1. 전역 변수에 의존하는 부분이 많음
2. DOM을 사용할수있는곳에서 실행된다고 가정하고 작성됨 (Dom이 제대로 실행이 안될경우 ?)
3. 함수의 리턴값이 없음

> 암묵적 입력과 출력을 없애라
- 암묵적 입력
  - 인자 외 다른 입력
- 암묵적 출력
  - 함수 호출의 결과로 영향을 받는것

리팩토링 후
1. 함수를 분리하여 재사용성이 좋아짐
2. 암묵적 입력 출력이 사라짐

~~~ js

var shopping_cart=[]
var shopping_cart_total=0

function add_item_to_cart(name,price){
    // 1. 전역변수를 인자로보냄  , 2. 함수분리 
    shopping_cart=add_item(shopping_cart,name,price)
    cal_cart_total() 
}

function calc_cart_total(){
    // 함수분리 , 전역변수를 인자로 보냄
    shopping_cart_total=calc_total(shopping_cart)
    set_cart_total_dom()
    // 무료배송가능한지에 대한 아이콘을 Dom에 업데이트
    update_shipping_icons()

    // 세금 계산한것을 돔에 업데이트
    update_tax_dom()
}
function update_shipping_icons(){
    var buttons=get_buy_buttons_dom()
    for(var i=0;i<buttons.length;i++){
        var button=buttons[i]
        var item=button.item
        if(get_free_shipping(shopping_cart_total,item.price)){
            button.show_free_shipping_icons()
        }
        else{
            button.hide_free_shipping_icons()
        }
    }
}

function update_tax_dom(){
    set_tax_dom(calc_tax(shopping_cart_total))
}

function add_item(cart,name,price){
    var new_cart=[...cart]
    new_cart.push({
        name:name,
        price:price
    })
    return new_cart
}

function calc_total(cart){
    var total=0
    for(var i=0;i<cart.length;i++){
        var item=cart[i]
        total+=item.price
    }
    return total;

}

function get_free_shipping(total,item_price){
    return item_price+total>=20
}
function calc_tax(amount){
    return amount*0.10
}

~~~

# 최종요약
1. 액션은 암묵적 입력 or 출력을 가지고 있으므로 없애라
2. 전역변수나 공유변수는 암묵적입력과 출력이된다
3. 암묵적입력은 인자로 바꿀 수있음
4. 암묵적 출력은 리턴값으로 바꿀수 있음