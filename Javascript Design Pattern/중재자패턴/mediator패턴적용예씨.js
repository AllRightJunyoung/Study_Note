// Colleague A
class Guest{
    constructor(_frontDesk,_id) {
        this.frontDesk = _frontDesk
        this.id = _id
    }

    // 1. Guest에서 frontDesk로 필요한 타올의 개수에 대한 정보를 보냄 
    getTowel(numberOfTowels) {
        this.frontDesk.getTowel(this,numberOfTowels) 
    }
    // 2. Guest에서 frontDesk로 음식 예약 날짜를 보냄
    dinner(date) {
        this.frontDesk.dinner(this,date)
    }

    setId(_id) {
        this.id=_id
    }
    getId() {
        return this.id
    }

}
// mediator
class FrontDesk{
    constructor() {
        this.cleaningservice = new CleaningService()
        this.restaurant = new Restaurant()
    }

    // 1. 프론트 데스크는 해당 게스트의 아이디와 Towel들을 클리닝 서비스로 전달 
    getTowel(guest, numberOfTowels) {    
        this.cleaningservice.getTowel(guest.getId(),numberOfTowels)
    }

    // 2. 프론트 데스크는 해당 게스트의 아이디와 date를 식사 서비스로 전달
    dinner(guest, date) {
        this.restaurant.dinner(guest.getId(),date)
    }


}

// Colleague B
class Restaurant{
    dinner(guest, date) {
        console.log(`Guest ${guest}번의 식사를 ${date}에 준비해두겠습니다.`)
    }

}
// Colleague C
class CleaningService{
    getTowel(guest, numberOfTower) {
        console.log(`Guest ${guest}번의 방에 ${numberOfTower}개의 타울을 제공해주었습니다.`)
    }
}
const frontdesk = new FrontDesk()
// Colleague A
const guest = new Guest(frontdesk, "1")

// Colleague B
guest.getTowel(11)
guest.dinner("저녁7시")