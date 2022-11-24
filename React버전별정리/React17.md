# React 17 버전업데이트 주요 내용

1. React 16버전까지는 document.addEventListner()에 대부분 이벤트를 연결해 위임했으나 , 17부터는 rootNode.addEventListner에 이벤트 연결해 위임
- 하위요소의 버튼에서 이벤트가 발생했는데 document의 html태그에 이벤트를 위임했었다 (16까진)
  > but 17부터는 html태그가아닌 버튼요소의 최상위 rootNode에 이벤트를 위임한다. 루트컨테이너 외부에 생성되는 portal도 내부적으로 이벤트 리스닝하도록 구현되어있어서 문제 발생 x

2. 새로운 JSX트랜스폼 방식 지원
  - import React를 하지 않아도 JSX를 사용할수있다. (16버전까지는 JSX코드 생성시 React.createElement로 반드시 변환해야됬으나 성능문제가 발생)
    - 컴파일과정에서 react/jsx-runtime의 jsx를 변환하는 코드가 자동으로 추가됨
    - 하지만 Hooks를 사용할경우 여전히 React를 가져와야한다.
  - React v17.0.0+, Create React App v4.0.0+, Next.js v9.5.3+ , Gatsby v2.24.5+ 지원
  - 불필요한 import React 코드 제거 

3. 이벤트 풀링 최적화 제거 
> 이벤트 풀링이란 ? : 자주 재사용되는 객체들을 미리 만들어 놓고 활용하는방법 
- SyntheticEvent 객체는 이벤트 핸들러가 호출된 후 초기화 되어 비동기적으로 객체에 접근할수없는 문제가발생하게되었음 (e.persist 메소드로 접근)


4. useEffect cleanup 타이밍 변화
- 16버전까지는 useEffect의 cleanup이 동기적으로 실행되었으나 , 동기식 처리가 큰 화면 업데이트시 성능저하를 유발했음
  - 17버전부터는 화면이 unmount된뒤 클린업이 실행된다 (화면이 반영된뒤)

5. undefined 반환에 대한 일관된 오류 처리
  - 16버전 까지는 모든 컴포넌트가 return 시 undefined를 반환할 경우 모두 오류를 출력했음
    - 하지만 forwardRef or memo 컴포넌트를 사용하면 React는 오류를 처리하지않은 버그가있었으나 오류를 출력하게만듬

6. 네이티브 컴포넌트 오류 스택 
  - 컴포넌트 스택에 추적 기능을 추가하여 문제가 되는 컴포넌트 방법을 제공하여 효과적으로 스택을 활용할수있게되었다.
  