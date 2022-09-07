// 추상화 

export default class Component{
    constructor(_view) {
        this.view=_view
    }
    render() {
        this.view.innerHTML=this.template()
    }
    template() {
        return ''
    }
}