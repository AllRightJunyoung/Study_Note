1. Sass나 SCSS쓰는 이유

- 스타일 시트가 점점 커지고 복잡해져서 유지관리가 어려워짐
- 변수 ,네이스팅 ,믹스인 ,가져오기 ,상속 ,내장기능 등 css에 없는 편의기능들이 있어 시간 절약이가능
- 코드 재사용 가능

2. SASS란

- 특정한 형태의 스타일시트를 CSS스타일 시트로 변경해주는 변환 엔진 컴파일러
  - 브라우저가 이해할수 있는 CSS로 변환해주는 도구
  - 다시 CSS로 컴파일해줄 프로세서

Sass 기술방식 2가지

.sass 기술방식과 .scss 방식

- 일반적으로 CSS와 좀 더 유사한 SCSS를 사용 . SCSS는 CSS와 동일하게 중괄호를 사용하는 방식!

3. 파일분리

- 각 프레임 별로 분리 (\_header.scss , \_home.scss)를 분리
- \_variable과 \_mixin파일도 따로 분리
- style.scss(메인파일)에서 분리했던 파일들을 import

파일명 앞에 언더바를 붙이는 이유

- 언더바를 붙이지않으면 분할 된 파일들 모두가 컴파일 되기 떄문에 여러개의 .css파일이 나눠서 저장됨
  - 언더바를 붙여서 파일명을 정한다면 Sass에게 이 파일이 main파일의 일부분임을 알려줘서 해당파일은 css파일로 컴파일 하지않고 내부에서 @import 형태로 작동

nesting 문법

- 기존 CSS는 부모에게 상속된 자식요소에게 스타일을 적용하려고 할떄마다 최상위 선택자를 반복 선언함
  But 지나친 nesting은 자제해야한다 !
  ```css
  info-list div {
    display: flex;
    font-size: 14px;
  }
  info-list div dt {
    font-weight: 700;
    margin-right: 7px;
  }
  ```

```css
nav {
  background: blue;
  padding: 10px;
  height: 50px;
  ul {
    display: flex;
    justify-content: flex-end;
    li {
      color: white;
    }
  }
}
```

앰퍼샌드 (ampersand)

- & 는 상위 에있는 부모선택자를 가리킨다.
- &을 이용하여 after,hover 등의 가상요소 , 가상클래스 ,class나 id 셀렉터등을 참조할수있음

& 응용

- &를 응용하면 아래 예시와 같이 공통 클래스명을 가진 선택자들을 중첩 시킬수있음

```css
.box {
  &-yellow {
    background: #ff6347;
  }
  &-red {
    background: #ffd700;
  }
  &-green {
    background: #9acd32;
  }
}

.box-yellow {
  background: #ff6347;
}
.box-red {
  background: #ff6347;
}
.box-green {
  background: #ff6347;
}
```

- 중첩 벗어나기
  @at-root 키워드를 사용하면 중첩에서 벗어날수있음
  - 중첩에서 벗어나고 싶은 선택자 앞에 작성

변수 (Variable)

- 유지보수를 쉽게 할수있음
- 무분별하게 CSS를 작성해서는 안됨 충돌할수있으므로

변수 사용하는 기준

- 값이 두번이상 반복되면 , 변수로 만든다. 값을 기억하지 않고 변수명만을 가지고 스타일을 할수있음
- 기존의 값을 다른 값으로 변경해야할 경우, 변수의 값만 변경하면 되기떄문에 값이 수정될 가능성이 있다면 변수생성을 고려해보기

변수 예시

```scss
$bgColor: #fff;
$font-h1: 28px;

h1 {
  color: $bgColor;
  font-size: $font-h1;
}
```

변수 type

- numbers,strings,color,booleans,lists,null 이 존재

1. numbers: 1, 82,20px ,2em 등
2. strings : "/image/a.png",bold left,uppercase
3. colors:green ,#FFF rgba(255,0,0,5)등
4. booleans :true, false
5. lists :

- 순서가 있는 값으로 값마다 인덱스를 가지고있음
  - 쉼표 , 나 공백 또는 일관성이 있는 /로 구분하여 생성
- $font-size: 10px,12px,16px (폰트사이즈 리스트)
- $image-file : photo_01,photo_02,photo_03 이미지 파일명 리스트
  list.nth(10px,12px,16px,2)
  list.nth([line1,line2,line3],-1) //line3

관련 내장함수

1. append : list에 값을 추가
2. index : list의 값에 대한 인덱스를 리턴
3. nth : lists의 인덱스에 해당하는 값을 리턴하는 함수

map (key,value 형태)

- map-get(map,key) : 키에 해당하는 값을 리턴하는 함수
- map-keys(map) : map에 있는 키 전부를 리턴하는 함수
- map-values: map에 들어있는 값 전부를 리턴하는 함수

- $font-weights:("regular":400,"medium":500,"bold:700)
- map-get($font-weights,"medium")
- map-get($font-weights,"extra-bold)

변수의 Scope (변수의 유효범위)

- 변수를 스코프내부의 지역변수에 선언하면 지역변수에서만 사용가능
- !global을 사용하여 local변수를 global변수로 만들어서 사용할수있다

Mixin

- 코드를 재사용하기 위해 만들어진 기능 . 선택자들 사이에서 반복되고 있는 코드들은 mixin을 사용하여 코드 반복을 줄인다.
- 중복되는 코드는 mixin으로 만들어 놓고 원하는 선택자 블럭에 mixin을 include한다.

사용법
@mixin 이름(매개변수) 생성
@include 이름(인수) 사용

예시

```css
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  background: gray;
}
.aside {
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
}
/* 중복 스타일 */
mixin으로 처리

@mixin center-xy{
    display:flex;flex;
    justify-content:center;
    align-items:center;
}
.card{
    @include center-xy;
}
.aside{
    @include center-xy;
}

mixin 매개변수 활용 예시


@mixin flexCenterTwo($size){
  display:flex;
  justify-content:center;
  align-items:center;
  list-style:none;
  li{
    margin-right:${size};
  }
}

 .card{
    @include flexCenterTwo(10px);
}
.aside{
    @include flexCenterTwo(10px);
}

@mixin flexCenterTwo($size=30px){ //default 옵션
  display:flex;
  justify-content:center;
  align-items:center;
  list-style:none;
  li{
    margin-right:${size};
  }
}

```

> @content를 mixIn과 활용하여 사용가능

Extend

- 연관 있는 요소들끼리 스타일 코드가 중복된 경우에 사용된다
  - mixIn은 관계가 없는 선택자에서 조금 다른 스타일을 적용할떄 사용

```scss
.profile-user{
  background-image:url("./programmer.png")
  background-size:cover;
  width:50px;
  hegiht:50px;
}

.comment-user{
  @extend .profile-user
}

%placeholder
%로 선택자를 만든다 => CSS로 컴파일되지않음

%base-button{
  width:133px;
  height:44px;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:14px;
  border-radius:10px;
}
.follow-button{
  @extend %base-button;
  backgrond-color:#ffffff;
}


```

조건문과 반복문 함수

1. 조건문 예시

```scss
@mixin avatar($size, $circle: false) {
  width: $size;
  height: $size;

  @if $circle {
    border-radius: $size/2;
  }
}

.square-av {
  @include avatar(100px, $circle: false);
}
.circle-av {
  @include avatar(100px, $circle: true);
}

@mixin theme-colors($light-theme: true) {
  @if $light-theme {
    background-color: $light-background;
    color: $light-text;
  } @else {
    background-color: $dark-background;
    color: $dark-text;
  }
}
```

SASS 컨벤션

- https://ui.toast.com/fe-guide/ko_HTMLCSS#sass
