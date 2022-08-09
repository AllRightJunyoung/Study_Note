
class PhoneStore{ //Subject
    constructor() {
        this.observers = []
        this.phoneStoreObj = {
         "PhoneStock":new Map(),
         "alarm":""
        }
      }

    getObserverList() {
        return this.observers;
    }
    subscribe(observer) {
        this.observers.push(observer)
    }
    unsubscribe(observer) {
        this.observers=this.observers.filter((obs)=>obs!==observer)
    }
    notifyAll() { //observer 들에게 정보를 알려줌  
        this.observers.forEach((subscriber) => { //subscriber들은 옵저버다
            try {
                subscriber.update(this.phoneStoreObj)
            } catch (error) {
                console.error('error',error)
            }
        })
    }

    갤럭시재고설정(_galaxy) { //갤럭시 핸드폰이 매장에 들어옴 
        if (!this.phoneStoreObj.PhoneStock.has('갤럭시')) {
            this.phoneStoreObj.PhoneStock.set('갤럭시',_galaxy)    
        }
        else {
            const count=this.phoneStoreObj.PhoneStock.get('갤럭시')
            this.phoneStoreObj.PhoneStock.set('갤럭시',count+_galaxy)
        }

        this.phoneStoreObj.alarm="갤럭시"
        this.매장에폰이들어온걸알림()
     }
    아이폰재고설정(_iPhone) {
        if (!this.phoneStoreObj.PhoneStock.has('아이폰')) {
            this.phoneStoreObj.PhoneStock.set('아이폰',_iPhone)    
        }
        else {
            const count=this.phoneStoreObj.PhoneStock.get('아이폰')
            this.phoneStoreObj.PhoneStock.set('아이폰',count+_iPhone)
        }

        this.phoneStoreObj.alarm="아이폰"
        this.매장에폰이들어온걸알림()
    }

    매장에폰이들어온걸알림() {
        this.notifyAll()
    }

}
class GalaxyUser{
    constructor() {
        this.name = "갤럭시사용자"
    }

    update(phoneStoreInfo) {
        // 해당 옵저버는 자기에 맞는 정보를 거른다.
        if (phoneStoreInfo.alarm === '갤럭시') {
            console.log(`갤럭시가 ${phoneStoreInfo.PhoneStock.get('갤럭시')}개가 들어왔습니다.`) 
        }
    }
}

class iPhoneUser{
     constructor() {
        this.name="아이폰사용자"
    }
    update(phoneStoreInfo) {
        // 해당 옵저버는 자기에 맞는 정보를 거른다.
        if (phoneStoreInfo.alarm === '아이폰') {
            console.log(`아이폰이 ${phoneStoreInfo.PhoneStock.get('아이폰')}개가 들어왔습니다.`)
        }
    }
}

const phoneStore = new PhoneStore() //subject
const g_user=new GalaxyUser()
const i_user=new iPhoneUser()
phoneStore.subscribe(g_user)
phoneStore.갤럭시재고설정(100)
phoneStore.subscribe(i_user)
phoneStore.아이폰재고설정(100)
