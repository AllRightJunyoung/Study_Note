import HistoryRouter from '../core/Router/HistoryRouter';
import Counter from './component/CounterPage/Counter';
import MainPage from './component/Main/mainPage';
import ItemApp from './component/Items/ItemApp';
const run = () => {
	const router = new HistoryRouter();
	router.addRoute('/', MainPage);
	router.addRoute('/app', ItemApp);
	router.addRoute('/counter', Counter);
	router.start('#root');
};
run();

// router.addRoute('/home/:number',home)
// router.addRoute('/home/:id', home)
// router.addRoute('/home/:id/intro', home)
// router.addRoute('/home/:id/intro/:id', home)
