# 6.1 Styled JSX

- Next.js가 기본적으로 제공하는 스타일링 기법
- CSS-In-JS 라이브러리
- 장점 : 선언한 CSS 규칙이 다른 컴포넌트에 영향을 주거나 충돌을 일으키지 않음

예제

```jsx
export default function Button(props){
    return (
        <>
        <button className="button">{props.children}</button>
        <style jsx>{`
            .button{
                padding:1em;
                border-radius:1em;
                border:none;
                background:green;
                color:white;
                }
            }
        `}
        </>
    )
}
>
```

> <style jsx global>을 사용함으로써 전역css에 적용도 가능하다

# 6.2 CSS Module

1. CSS-in-js 단점

- Css-in-js는 문법 하이라이팅 , 자동완성 린팅등의 기능을 제공하지 않아 불편하고 컴파일 타임에 CSS로 변환되어서 느리며 , 코드내에 CSS에 대한 의존성이 커져 어플리케이션 번들사이즈가 커진다.

- 또한 CSS-in-JS는 리액트 하이드레이션이 끝나면 CSS규칙을 다시 생성하여 실행시점에 부하가 생겨 웹 어플리케이션이 느려진다.

> 반면 CSS 모듈을 통해 CSS 클래스를 만들며 실행 시간 동안 성능부하 없이 리액트 컴포넌트에서 CSS 클래스를 불러올수있음

2. CSS 모듈 장점

- CSS 모듈의 클래스들은 컴포넌트 스코프를 가져서 다른 컴포넌트의 클래스와 충돌될 우려가없음
- PHP,루비,자바 , 템플릿 엔진에서도 사용이 가능해서 지원되는 범위가 많다
- Can I use에서 가져온 값을 이용해서 CSS 규칙에 벤더별 접두사를 붙여준다.
- PostCSS 컴파일로 IE11과 같이 오래된 브라우저에서도 사용할수있도록 해준다.

# 6.3 SASS

- 가장 널리 사용되는 CSS 전처리기이며 Styled JSX나 CSS모듈 Next.js에서 기본적으로 지원

# 결론

- Styled JSX 역시 서버 측에서 첫 렌더링되고 난 뒤 리액트 하이드레이션이 끝나면 클라이언트 측에서 만든 CSS를 다시렌더링해야하므로 어플리케이션 실행 시점에 부하가 걸린다.

