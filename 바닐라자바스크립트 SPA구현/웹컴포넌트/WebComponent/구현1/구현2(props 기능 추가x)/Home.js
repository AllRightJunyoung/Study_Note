import Component from '../../../core/Component/Compontent';

// 추상화된 Component 상속
export default class Home extends Component {
	// 오버라이드
	constructor() {
		super();
		this.state = {
			items: [
				{
					seq: 1,
					content: 'item1',
				},
				{
					seq: 2,
					content: 'item2',
				},
			],
		};
	}

	template() {
		return `
        <div>
        <h1> Home 페이지 </h1>

        <button data-action="onUpdate">추가</button>
        <div data-component="item-box">
         <ul>
          ${this.state.items
						.map(
							item => `
          <li>
          ${item.content}
          <button data-action="onDelete" data-index="${item.seq}">삭제</button>
          </li>
          `,
						)
						.join('')}
          </ul>
        
        </div>
        </div>
        `;
	}
	//아이템 추가하는 함수
	addItem(item) {
		const { items } = this.state;
		const seq = Math.max(0, ...items.map(v => v.seq)) + 1;
		this.setState({
			items: [...items, { content: item, seq }],
		});
	}
	// 아이템 삭제하는 함수
	deleteItem(seq) {
		const items = [...this.state.items];
		items.splice(
			items.findIndex(v => v.seq === seq),
			1,
		);
		this.setState({ items });
	}

	// 이벤트 설정 (이벤트위임 패턴 )
	setEvent() {
		this.addEventListener('click', e => {
			const elementTarget = e.target;
			if (elementTarget && elementTarget.dataset.action === 'onUpdate') {
				this.addItem(`item ${this.state.items.length + 1}`);
			} //onDelete
			else if (elementTarget && elementTarget.dataset.action === 'onDelete') {
				const delItem = elementTarget.dataset.index;
				this.deleteItem(delItem);
			}
		});
	}
}

if (!customElements.get('custom-home')) {
	customElements.define('custom-home', Home);
}
