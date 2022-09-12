export default class Component2 extends HTMLElement {
	connectedCallback() {
		// 1. html 생성 부분
		this.render();
	}

	// 3. 3. attribute가 바뀌면 실행되는 함수
	attributeChangedCallback() {
		this.render();
	}
	template() {
		return;
	}

	render() {
		this.innerHTML = this.template();
	}
	// state 변경
	setState(_newState) {
		this.state = { ...this.state, ..._newState };
		this.render();
	}
}
