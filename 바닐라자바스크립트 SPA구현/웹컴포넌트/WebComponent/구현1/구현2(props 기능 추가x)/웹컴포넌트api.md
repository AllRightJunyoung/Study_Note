# 웹 컴포넌트란 ?
- 바닐라 자바스크립트로 리액트와 같이 컴포넌트를 구성할수있음
  - 깃허브에서 사용
- 리액트 나오기전에 많이사용함 

# 웹 컴포넌트를 왜 사용할까?
- 길게 작성한 태그를 커스텀태그로 축약해서 사용이 가능해짐
- 컴포넌트 단위로 구성하게되면 재사용성이라든지 유지보수 관리 측에서 좋아짐 (리액트와 동일)


# 웹 컴포넌트 사용예시

~~~js

<label></label>
<input>

<custom-input>로 표현할수있는  커스텀 태그로 만들어보면 아래와같음
customElements.define('custom-input',축약할 문법을 이용할 클래스명)

customElements.define('custom-input',CustomInput)

class CustomInput extends HTMLElement {
	connectedCallback() {
		// 1. html 생성 부분
		this.render();
	}

	// 2. attribue가 바뀌는지 감시하는 함수
	static get observedAttributes() {
		return ['name'];
	}

	// 3. 3. attribute가 바뀌면 실행되는 함수
	attributeChangedCallback() {
		this.render();
	}

	render() {
		let label = document.createElement('label');
		label.innerHTML = 'hello label';
		this.appendChild(label);
		let input = document.createElement('input');
		this.appendChild(input);
	}
}



// attribute 속성 부여가능 
<custom-input name="123">
~~~



# 웹 컴포넌트 API 메소드 소개

- connectedCallback
  - Component가 DOM에 연결될 때 호출 된다. componentDidMount메소드와 유사 

- disconnectedCallback
  - Component가 DOM에서 삭제될 때 호출 된다.

- attributeChangedCallback 
  - 속성이 변경될떄마다 호출 된다.
  -  static get observedAttributes() 함수에 나열된 속성될때만 트리거됨

- static get observedAttributes
  - 배열값을 리턴하고 배열값은 속성이 될수있음 






# 참고
- https://www.youtube.com/watch?v=RtvSgptpfnY
- https://github.com/Meet-Coder-Study/frameworkless-front-end-development/blob/main/chapter4/shldhee.md