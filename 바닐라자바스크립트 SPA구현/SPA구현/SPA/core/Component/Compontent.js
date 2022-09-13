export default class Component {
	constructor(_target, _props) {
		this.target = _target === undefined ? document.querySelector('#root') : _target;
		this.props = _props;
		this.useState();
		this.render();
		this.setEvent();
	}

	template() {
		return;
	}

	render() {
		// 페이지 렌더링
		this.target.innerHTML = this.template();
		this.componentDidMount();
	}
	// state 변경
	setState(_newState) {
		this.state = { ...this.state, ..._newState };
		this.render();
	}
	//state기본값 설정
	useState() {}
	// 이벤트 설정
	setEvent() {}

	componentDidMount() {}
}
