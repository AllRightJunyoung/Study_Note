class Subject{
    constructor() {
        this.observers = []       
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
    notifyAll() { //observer 들에게 알림 
        this.observers.forEach((subscriber) => {
            try {
                subscriber.update(this.constructor.name)
            } catch (error) {
                console.error('error',error)
            }
        })
    }
}
class Observer{
    constructor(name) {
        this.name=name
    }
    update(subj) {
        console.log(`${this.name}: notified from ${subj} class !`)
    }
}
const subj = new Subject()
const a = new Observer('A')
const b = new Observer('B')
const c = new Observer('C')

// 옵저버 a,b,c를 등록함 

subj.subscribe(a)
subj.subscribe(b)
subj.subscribe(c)

//옵저버들에게 알림 
subj.notifyAll()

subj.unsubscribe(c)
console.log()
subj.notifyAll()