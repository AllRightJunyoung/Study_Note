import Component from '../../../core/Component/Compontent';
import ItemContainer from './ItemContainer';

// 추상화된 Component 상속
export default class ItemHeader extends Component {
	// 오버라이드

	// 부모에서 버튼에 대한 이벤트 바인딩 해줌
	template() {
		return `
        <h1> Item 메인 페이지 </h1>
        <div data-component="item-container">
       
        </div>
        `;
	}
	useState() {
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

	// 렌더링이 마친뒤 props설정가능
	componentDidMount() {
		const { addItem, deleteItem } = this;

		// 자식 컨테이너 담는다.
		const _ItemContainer = this.target.querySelector('[data-component="item-container"]');

		// 해당 컴포넌트의 selector와 props를 지정
		new ItemContainer(_ItemContainer, {
			addItem: addItem.bind(this),
			deleteItem: deleteItem.bind(this),
			items: [...this.state.items],
		});
	}
}
