
// Concreate Creator 
class PizzaFactory{
    createpizza(name) {
        switch (name) {
            case "페퍼로니":
                return new PepperoniPizza()
            case "파인애플":
                return new PineapplePizza()
        }
    }

}

// 인터페이스 (interface) Product
class Pizza{
    constructor(price) {
        this.price=price
    }
    getPrice() {
        throw new Error('인터페이스 입니다.')
    }

}


// Concrete Product A
class PepperoniPizza extends Pizza{
    constructor() {
        super(5500)
    }
    getPrice() {
        console.log(`페퍼로니 피자 가격은 ${this.price} 입니다.`)
    }
}


// Concrete Product B
class PineapplePizza extends Pizza {
    constructor() {
        super(6500)
    }
    getPrice() {
        console.log(`파인애플 피자 가격은 ${this.price} 입니다.`)
    }
}

const 피자공장 = new PizzaFactory()
const 페퍼로니피자 = 피자공장.createpizza('페퍼로니')
const 파인애플피자 = 피자공장.createpizza('파인애플')
페퍼로니피자.getPrice()
파인애플피자.getPrice()