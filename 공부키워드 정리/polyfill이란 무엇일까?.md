# Babel 과 Polyfill의 차이는 무엇일까?

- Babel은 JSX, TypeScript ES6를 ES5문법 자바스크립트로 변환시켜준다.
  - 코드를 컴파일 타임에 트랜스 컴파일링 해준다
  > But Promise와 async awiat같은 메소드들은 바벨에 의해 컴파일되지않는다 그래서 Polyfill이 필요하다
  - const,let 화살표함수 , class , destructuring같은것은 바벨에 의해 컴파일된다.

- Polyfill은 런타임에 등록되지 않은 ES5문법에 존재하지 않는 메서드들 (Promise,async await)을 ES5에 맞게 추가해줌
  - 쉽게 말해 바벨이 변환할수 없는 최신문법들을 ES5문법에 맞게 추가함
  

# 참고

- <https://nyagm.tistory.com/196>
- <https://happysisyphe.tistory.com/m/49>
