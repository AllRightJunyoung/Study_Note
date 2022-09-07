// 웹 컴포넌트 추상화 코드 
// 황준일 개발자 블로그 참고 

export default class Component{
    state;
    target;
    constructor(_target,_props) {
        this.target = _target
        this.props=_props
        this.setup();
        this.render()
        this.setEvnet()
    }   

    render() {   // template을 렌더링 
        this.target.innerHTML = this.template()
        this.mounted() // 렌더링 후에 마운트 생성 
    }
    template() {
        return ''
    }
    // 기본 state 설정 
    setup() {
        
    }
    // 이벤트 설정 
    setEvnet() {
        
    }
    // 이벤트 추가 
    addEvent(eventType, selector, callback) {
        const children = [...this.target.querySelectorAll(selector)]
        
        const isTarget = (target) => children.includes(target) || target.closest(selector)
        
        // 이벤트를 쉽게 처리할수있는함수 
        this.target.addEventListener(eventType, event => {
            if (!isTarget(event.target)) {
                return false
            }
            callback(event)
        })
        
    }

    // 새로운 상태 설정 
    setState(newState) {
        this.state={...this.state,...newState}
        this.render()
    }
    mounted() {
        
    }


}