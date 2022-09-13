import Component from '../../../core/Component/Compontent';

// 추상화된 Component 상속
export default class ItemContainer extends Component {
	// 오버라이드
	template() {
		return `
       <button data-action="onUpdate">아이템 추가</button>
	    <ul>
	   ${this.props.items
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

        `;
	}
	// 부모로부터 온 Event 설정
	setEvent() {
		const { addItem, deleteItem, items } = this.props;

		this.target.addEventListener('click', e => {
			if (e.target.dataset.action === 'onDelete') {
				const delItem = e.target.dataset.index;
				deleteItem(delItem);
			}
		});

		this.target.addEventListener('click', e => {
			if (e.target.dataset.action === 'onUpdate') {
				addItem(`item ${items.length + 1}`);
			}
		});
	}
}
