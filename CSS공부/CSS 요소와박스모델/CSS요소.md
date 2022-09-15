# CSS에는 인라인요소와 블록 요소가 존재한다.

# 인라인 속성
- 컨텐츠 만큼 너비를 차지함
  - 이러한 이유로 한줄에 여러개를 넣을수있음
- width,height 속성 무시
- 가로 공간 차지
- margin,padding : 가로만 적용

# 블록 속성
- 부모의 너비 만큼 차지
- width,height 속성 적용
- 가로공간 독점
- margin,padding : 모두적용 
- magin 속성은 상하(위아래)가 상쇄됨 마진겹침 현상

# 인라인 블록
- 컨텐츠 만큼 차지
- 가로공간 차지 
- width ,height 적용
- margin ,padding :모두적용

# 인라인 요소 목록
- https://developer.mozilla.org/ko/docs/Web/HTML/Inline_elements#%EC%9A%94%EC%86%8C_%EB%AA%A9%EB%A1%9D

# 블록 요소 목록
- https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements#elements


# CSS 단위

1. px : 절대값으로서 픽셀 단위
2. % : 부모요소와 상대적으로 적용이되는단위 100% = 1em이다 (연쇄효과 발생)
3. em : 부모요소와 상대적으로 적용이되는단위 (연쇄효과 발생)
4. rem : html 요소와의 상대적 크기를 가지므로 요소의 중첩에 영향 받지않음


# 뷰포트 너비와 높이 단위 (반응형 웹에서 사용)
- vw : 현재 윈도우창의 너비를 뜻함 
  - 50vw : 현재 윈도우창의 50% 너비로 지정
- vh : 현재 윈도우창의 높이를 뜻함  
  - 50vh :현재 윈도우창의 50% 높이로지정

- vmin : vw와 vh중 더 작은것에 적용
- vmax : vw와 vh중 더 큰것에 적용

- calc(50%+100px)
  - vw vh단위에서 calc는 매우 유용함
  - 50%보다 100px더 사용한다.


> 위 두 단위 둘다 박스모델과 폰트에서도 사용가능함
> 컴퓨터 or 휴대폰에서 보는 화면은 다르다 이떄 vmax와 vmin 단위를 사용한다.

# 최대 /최소 너비 / 높이 속성 ,
- max-width : 최대 너비 설정 (이 이상 안넘어감)
- min-width :  최소 너비 설정 ( 최소 너비 값)
- max-height : 최대 높이 설정 (이 이상 안넘어감)
- min-height : 최소 높이 설정 ( 최소 높이 값)



# 박스모델 (중요함)

1. margin 요소
- 위 아래가 상쇄됨 (합쳐짐)
- 각 요소간에 간격 이라고 보면됨 (최상단)
- margin-top , margin-left , margin-right 세부적으로 지정가능
- margin 0 auto 가운데정렬 , 위아래는 안통하고 양 옆을 꽉채움 (auto)
  - auto는 어떤요소를 화면의 가운데로 보내는데 사용 (auto가 적용된 속성을 꽉채움)
  - 오늘날에는 flex사용
- inline-block에서는 marin 0 auto가 안먹으므로 text-align을 써야됨

2. padding 요소
- border와 content사이에있는 속성
- padding-top ,padding-left ,padding-right 세부적으로 지정가능

3. border 요소
- margin 과 padding 사이에 있는 속성
- 테두리를 지정할수있음

4. box-sizing 속성
- content-box
  - padding과 border의 값을 포함시키지 않고 박스사이즈를 만듬
- border-box
  - padding과 border의 값을 포함시키고 박스사이즈를 만듬
  - padding과 border값을 밀어넣고 싶을때 사용 (정사각형모양에 가까워짐)


5. overflow 속성
- 부모 요소보다 높이나 너비값이 큰 자식 요소를 나타내는 방법을 지정
  1. hidden이면 부모영역을 벗어나는 자식요소를 감춘다.
  2. visible이면 자식요소를 보여준다.
  3. auto로 되있으면 자식요소를 스크롤을 해준다 
  4. overflow-x, overflow-y 는 x축 y축에 대해 보일지말지 설정할수있음

6. box-shadow 속성
 - 박스요소에 그림자를 줄수있음 