# Stash 알아보기

# Stash가 왜 필요할까?
- 기존의 작업을 하는도중에 임시적으로 저장해야될 상황이 발생할떄 사용된다

# Stash 기본 사용법
1. 먼저 임시로 add로 보낼 파일을 작성하고 git add .
2. git stash 명령어사용

# Stash 기본 명령어
1. git stash
- 현재 작업중이던 사항들을 임시로 저장이 가능하다

2. git stash pop
- stash에 있는 것들을 전부다 pop 해서 코드에 반영시킴


# 원하는 것만 Stash 하는방법
- git stash -p 를 통해 현재 작업과 변동된 사항을 트래킹 가능하며 stash가능 (add -p와 기능만다르고 동일)

# 메시지와 함께 Stash 하는 방법
- git stash -m '메시지명'

# Stash 활용하기
- git stash list 로 목록을 볼수있다
- git stash apply (stash list 명)으로 원하는 stash를 골라서 할수있음
- git stash drop (stash list명) stash를 drop할수있음
- git stash pop (stash list명) stash를 pop할수있음
- git stash clear (stash들을 지울수있음)

> 💡 git stash branch (브랜치명) (충돌상황을 대비해 새로운브랜치에 stash내용들을 옮길수있음)




