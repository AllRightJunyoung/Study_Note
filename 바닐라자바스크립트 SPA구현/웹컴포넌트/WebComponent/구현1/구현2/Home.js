import Component2 from '../../../core/Component/Compontent2';

// 추상화된 Component 상속
export default class Home extends Component2 {
	// 오버라이드
	constructor() {
		super();
		this.state = {};
	}

	template() {
		return `
        <div>
        <h1> Home 페이지 </h1>
        </div>
        `;
	}
}

if (!customElements.get('custom-home')) {
	customElements.define('custom-home', Home);
}
