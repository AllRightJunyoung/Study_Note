import Component from '../../../core/Component/Component'


export default class ContentButton extends Component{
    // 오버라이드 
    template() {
        return `<button data-route="/content">Content</button>`
    }
}

