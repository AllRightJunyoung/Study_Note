import Component from '../../../core/Component/Compontent';
export default class Counter extends Component {
	template() {
		return `
            <div>
            <h1>Counter : ${this.state.count}</h1>
            <button data-action="onIncrease">증가</button>
            <button data-action="onDecrease">감소</button>
            </div>
        
        `;
	}

	useState() {
		this.state = {
			count: 0,
		};
	}
	increase() {
		const newCount = ++this.state.count;
		this.setState({
			count: newCount,
		});
	}
	//
	decrease() {
		const newCount = --this.state.count;
		this.setState({
			count: newCount,
		});
	}
	setEvent() {
		this.target.addEventListener('click', e => {
			if (e.target.dataset.action === 'onIncrease') {
				this.increase();
			} else if (e.target.dataset.action === 'onDecrease') {
				this.decrease();
			}
		});
	}
}
