# Flex 속성 
1. 요소들을 포함하는 부모에 적용하는 속성
- 자식들은 플렉스 속성에 맞게 위치함
2. flex-direction 속성
- 내부 요소 의 x,y축을 정한다 (row,col) 가로,세로 , row-reverse , col-reverse
  - default = row

3. flex-wrap 속성
- 내부 요소의 길이가 컨테이너를 넘어갈떄 이들을 여러 줄에 걸쳐서 나열할지 여부 결정
4. justify-content 속성
- x축을 기준으로 자식값들을 이동시킴
5. align-center 속성
- y축을 기준으로 자식값들을 이동시킴 
6. gap 속성
- 아이템 간에 간격을 줄 수있음 두개의 값을 넣어서 가로간격과 세로간격을 다르게 지정
- 부모 요소에 줌

7. flex-basis (크기 설정)
- 기본값 auto
- 메인축상의 길이로 flex-direction 값에 따라 너비 또는 높이로 작용


8. flex-grow
- 해당 아이템의 남은 공간들을 채울지 여부 (기본값 0) 
- 자식 요소에 줌

9. flex-shrink
- 남은 공간이 부족할떄 해당 아이템의 공간을 줄인다.
  - 값이 클수록 공간이 줄어듬
- 자식요소에줌