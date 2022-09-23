# git commit 메시지 잘 작성하기
1. 하나의 작업은 커밋 하나에 담기는것이 좋음
2. 어떤 작업이 이뤄졌는지 알아볼수있게 작성

# git 컨벤션 (중요)

~~~ text
type: subject

body (optional)
...
...
...

footer (optional)

feat: 압축파일 미리보기 기능 추가

사용자의 편의를 위해 압축을 풀기 전에
다음과 같이 압축파일 미리보기를 할 수 있도록 함
 - 마우스 오른쪽 클릭
 - 윈도우 탐색기 또는 맥 파인더의 미리보기 창

Closes #125
~~~

## type
1. feat : 새로운 기능 추가
2. fix : 버그 수정
3. docs : 문서 수정
4. style : 공백,세미콜론 등 스타일 수정
5. refactor :코드 리팩토링
6. perf : 성능개선
7. text : 테스트추가
8. chore: 빌드 과정 또는 보조 기능(문서 생성기능 등) 수정

## Subject
- 커밋의 작업 내용 간략히 설명

## Body (optional)
- 길게 설명할 필요가 있을 시 작성

## Footer (optional)
- Breaking Point 가 있을 때 
- 중요한 변경지점이 있을시
- 특정 이슈에 대한 해결 작업일 때


> 일반적으로 type:subject 형식으로 작성

# hunk 별로 Staging 단계를 진행하는 방법
> git add -p 명령어로
- 변경사항 하나하나 tracking 할수있음
- y 또는 n으로 각 헝크를 선택 할수있다
- 부분적으로 add가 가능하다.

# 변경사항을 확인하고 커밋하는방법
- git commit -v
- git diff --staged (현재 스테이지랑 변경된 사항을 비교할수있음)
  
