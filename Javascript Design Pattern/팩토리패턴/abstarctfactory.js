// Absract Factory class
class FoodFactory{ 
    constructor() {
        if (new.target === FoodFactory) {
            throw new Error('추상클래스는 접근 불가')
        }
    }
    createFood() {
        throw new Error('추상클래스 메소드는 접근 불가')
    }
}

class PizzaFactory extends FoodFactory{ // Concrete Factory
    createFood(type) {
        switch (type) {
            case '레드피자':
                return new RedPizza()
            case '블루피자':
                return new BluePizza()
        }
    }
}

class NoodleFactory extends FoodFactory{ // Concrete Factory
      createFood(type) {
        switch (type) {
            case '라면':
                return new Ramen()
            case '국수':
                return new gooksu()
        }
    }
}

// Abstract product class
class Noodle{
    constructor() {
        if (new.target === Noodle) {
            throw new Error('추상클래스는 접근 불가')
        }
    }
    getPrice() {
        throw new Error('추상클래스는 접근 불가')
    }
}

class Ramen extends Noodle{ //Concrete class
    getPrice() {
        console.log("라면 가격은 5000원입니다.")
    }
}
class gooksu extends Noodle{ //Concrete class
    getPrice() {
        console.log("국수 가격은 3000원입니다.")
    }
}



// Abstract product class 
class Pizza{
    constructor() {
        if (new.target === Pizza) {
            throw new Error('추상클래스는 접근 불가')
        }
    }
    getPrice() {
        throw new Error('추상 클래스 접근 불가')    
    }
}

class RedPizza extends Pizza{
    getPrice() {
        console.log(`레드 피자의 가격은 10000원 입니다.`)
    }
}
class BluePizza extends Pizza{
    getPrice() {
        console.log(`블루 피자의 가격은 8000원 입니다.`)
    }
 }
    
const 피자공장 = new PizzaFactory()
const 레드피자 = 피자공장.createFood('레드피자')
const 블루피자 = 피자공장.createFood('블루피자')
레드피자.getPrice()
블루피자.getPrice()

const 누들공장 = new NoodleFactory()
const 라면 = 누들공장.createFood('라면')
const 국수 =누들공장.createFood('국수')
라면.getPrice()
국수.getPrice()