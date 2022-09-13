import Component from '../../../core/Component/Compontent';
import ItemApp from '../Items/ItemApp';
import Counter from '../CounterPage/Counter';
export default class MainPage extends Component {
	template() {
		return `
        <div>
        <h1> 어디로 가고 싶은가요 ? </h1>
        <button data-route="/app">App 페이지</button>
        <button data-route="/counter">Counter 페이지</button>
        </div>
        
        
        `;
	}
	setEvent() {
		this.target.addEventListener('click', e => {
			if (e.target.dataset.route === '/app') {
				new ItemApp();
			} else if (e.target.dataset.route === '/counter') {
				new Counter();
			}
		});
	}
}
