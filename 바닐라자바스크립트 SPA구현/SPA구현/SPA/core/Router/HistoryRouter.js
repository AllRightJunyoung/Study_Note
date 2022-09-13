// 사용자가 요청한 URL에 따라 해당 URL에 맞는 페이지를 보여주는 준다
import { changeBrowserRoute } from './util/History';
import { findRoute } from './util/Routing';
import { importRoute, isRouteEvent, getBroswerRoute } from './util/other';

export default class HistoryRouter {
	constructor() {
		this.root = null;
		this.routes = new Map();
		window.addEventListener('click', e => this.onRouterHandler(e)); //  클릭했을떄 동작하게
		window.addEventListener('popstate', () => this.onInit()); // 뒤로가기 기능
	}

	start(_root) {
		this.root = document.querySelector(`${_root}`);
		this.onInit(); //현재 url에 맞는 페이지 로딩
	}

	// 컴포넌트를 렌더링하는 함수
	renderComponent(component) {
		new component(this.root, null);
	}

	// 해당 route에 맞는 컴포넌트를 가져옴
	getRoute(route) {
		return this.routes.get(route);
	}

	// 해당 route의 존재유무를 확인
	hasRoute(route) {
		return this.routes.has(route);
	}

	// 라우트 추가 기능
	addRoute(_route, _element) {
		this.routes.set(_route, _element);
	}

	// 클릭이벤트로 구현  (해당 컴포넌트를 눌렀을떄만 라우팅이 동작하게 구현 )
	onRouterHandler = e => {
		if (!isRouteEvent(e)) {
			//유효한 이벤트인지 체크  클릭이벤트로 구현해서 필요 data-link속성을 사용함
			return;
		}

		const route = importRoute(e); // 발생한 data-link 기반으로 브라우저 경로 가져오기
		if (this.hasRoute(route)) {
			const component = this.getComponent(route); // route와 매칭되는것을 찾아서 객체로 반환
			changeBrowserRoute(route); //Broswer url 변경 (pushState)
			this.renderComponent(component); // 컴포넌트를 렌더링함
		} else {
			// route에 없는 것이면
			changeBrowserRoute(route); //Broswer url 변경 (pushState)
			this.root.innerHTML = '404 Not Found';
		}
	};

	//뒤로가기 구현
	onInit = () => {
		// location.pathname을통해 브라우저의 url 기반으로 컴포넌트를 가져옴
		const component = this.getComponent(getBroswerRoute());

		if (component) {
			// 브라우저 url 변경
			changeBrowserRoute(getBroswerRoute());
			this.renderComponent(component);
		} else {
			this.root.innerHTML = '404 Not Found';
		}
	};

	// 해당 라우팅에 맞는 컴포넌트를 가져옴
	getComponent(route) {
		return findRoute(route, this.routes);
		//정적 라우팅이면 그냥 해당 컴포넌트를 가져옴 , 동적라우팅이면 /home/4로들어온거를 /home/:id와 매핑시켜 map에서 객체를 가져옴
	}
}
