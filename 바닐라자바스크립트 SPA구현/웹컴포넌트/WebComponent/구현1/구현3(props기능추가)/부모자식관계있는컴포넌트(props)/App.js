import Component from '../../core/Component/Compontent';
import ItemHeader from './Items/ItemPage';
import Counter from './CounterPage/Counter';
export default class App extends Component {
	template() {
		return `
            <div data-component="item-header">

            </div>
            <br>
            <br>
            <div data-component="counter">

            </div>
        
        `;
	}
	componentDidMount() {
		const _ItemHeader = this.target.querySelector('[data-component="item-header"]');
		const _Counter = this.target.querySelector('[data-component="counter"]');
		new ItemPage(_ItemHeader, null);
		new Counter(_Counter, null);
	}
}
