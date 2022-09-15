# CSS를 적용하는 세가지 방법
1. 인라인 스타일 : HTML태그에 style속성으로 CSS코드를 넣어줌
2. 내부 스타일 : head태그안에 style태그를 둬서 CSS 코드를 작성
3. 링킹 스타일 시트 (가장많이사용): 외부의 CSS파일을 HTML 문서에 연결함

~~~html
// 1. 인라인 스타일 (매우비추)
<b style="color:red"> </b>
1. HTML코드와 CSS가 분리가 안됨
2. 재사용성이 구림


// 2. 내부 스타일
1. 전체코드가 적을떄 사용 (짧은문서에서)
<head>
<style>
.hi{
    color:blue;
}
</style>
</head>

// 3. 링킹 스타일 
1. .css파일안에 작성하고
2. link태그로 연결함
<link rel="stylesheet" href="./style.css">

~~~

# CSS 선택자
- CSS 선택자는 같은 선택자일경우 뒤에 오는게 우선순위가 더 높음
- CSS는 구체적일수록 우선순위가 높음
- 우선순위 : id>클래스>태그
~~~ css
* { // 페이지안에 모든곳에 적용이된다.
 color:red;
}

/* 태그 선택자  */
모든 요소 (*)의 선택자보다 우선순위가 높음 
p{
 color:blue;
}
h1{
  color:red;
}

/* 클래스 선택자 */
blue클래스에 적용한다.
.blue{
    color:lightblue;
}


p태그의 blue라는 클래스에 적용한다
<p class="blue">
p.blue{
    color:slateblue;
}

<p class="blue dark"></p>
클래스가 여러 요소를 가질떄 아래와 같이 사용
.blue.dark{
 color:yellow;
}

// p태그의 blue와 dark 값을 가진 클래스 
<p class="blue dark"></p>
p.blue.dark{

}

/* id 선택자 */
#name{

}

/* 그룹 선택자 */
여러 개를 선택해서 설정
span, .dark,#red{

}

/* 자손 선택자 */
outer클래스의 li전부를 선택함
.outer li{

}
/* 자식 선택자 1촌 */
outer클래스에서 바로오는 자식인 li를 선택
.outer > li{

}
outer 클래스에서 바로오는 자식인 li의 일촌이상
.outer > li  li{

}

/* 뒤따르는 모든 형제들 동일한 계층 */
starter클래스를 뒤따르는 li들을 선택 
.starter ~ li {

}

/*  starter클래스의 바로 동생인 li선택 */
/* + 선택자도 모두 동일한 계층임 */
.starter + li {

}

/* 가상클래스 */
ol클래스의 자손들인 li중에서 첫번쨰 동생
ol li:first-child{

}

ol클래스의 자손들인 li중에서 마지막 동생
ol li:last-child{

}
/* ~가 아닌 요소 가상 클래스 */
outer클래스의 1촌 자식인 li들 중에 last-child가 아닌것
.outer > li:not(:last-child){

}

/* ol의 자손인 li중에 3번쨰꺼 */
ol li:nth-child(3){

}

/* ol의 자손인 li중에 2번쨰꺼마다 */
ol li:nth-child(2n){

}

/* ol의 자손인 li중에 홀수만 */ even은 짝수
ol li:nth-child(odd){

}
/* li들중에 마우스가 올라간것만 */
li:hover{

}
~~~








# 참고
- 얄코
- 모던 웹을 위한 css 바이블