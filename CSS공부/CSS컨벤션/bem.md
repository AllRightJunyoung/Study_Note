# BEM이란?
- CSS 컨벤션 이며 Block,Element,Modifier를 뜻한다.
- id를 사용하지 않고 클래스만 사용한다.
- SASS의 부모참조자 & 와 찰떡 궁합
- 클래스네임이 너무 긴 단점도 존재
- block-name__elementname--Modifier로 씀

~~~ css
// header block
// navigation Element
// navi-test Modifier


.header__navigation--navi-text {
  color: red;
}


<form class="search-form">
    <input class="search-form__input"/>
    <button class="search-form__button">Search</button>
</form>

~~~

1. Block
 - 재사용 가능한 기능적으로 독립적인 페이지 컴포넌트

2. Element
 - 자신의 블럭안에서만 의미를 가짐
 - 블럭을 구성하는 단위 (블럭에 속한)
 
3. Modifier
 - 블럭이나 엘리먼트의 속성



# 참고
- https://nykim.work/15