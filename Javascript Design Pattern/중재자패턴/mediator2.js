
// 1. checkBox를 눌렀을떄 체크 했다는것을 MainUI에게 전달하고 MainUi는 해당 checkbox에맞는 UI를 보여줌 

// Mediator
class MainUi{
    constructor() {
        this.AnimalUi=new AnimalUi()
    }
    // 1. MainUi에서 AnimalUi를 실행시키는부분
    showAnimalUi(event) {
        if (event.checked) {
            this.AnimalUi.showUi()
        }
        else {
            this.AnimalUi.closeUi()
        }
       
    }
}

// Colleague
class AnimalcheckBox{
    constructor(_MainUi) {
        this.main = _MainUi
        this.checked=false
    }

    // 중재자에게 animalUi를 보여달라고 전달 
    checkBoxClick() {
        if (!this.checked) {   
           console.log('AnimalCheckBox에서 check를 하였습니다.')
           this.checked=true
           this.main.showAnimalUi(this)
        }
        else {
            console.log('AnimalCheckBox에서 check를 해제 하였습니다.')
            this.checked = false
            this.main.showAnimalUi(this)
        }
    }

}

// Colleague
class AnimalUi{
    showUi() {
        console.log("Animal UI가 보여졌습니다.")
    }
    closeUi() {
        console.log('Animal UI가 닫혔습니다.')
    }
}
// mediator
const mu = new MainUi()
const animalcheckbox = new AnimalcheckBox(mu)
animalcheckbox.checkBoxClick()
animalcheckbox.checkBoxClick()
