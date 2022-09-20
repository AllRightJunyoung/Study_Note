# Git 이란?
1. 프로그램 버전 관리 시스템 이다
  - 프로그램의 버전들을 언제 든지 되돌릴수있음
  - 프로그램의 변경 사항을 쉽게 파악할수있다

2. 실무에서 협업툴로 사용


# GIT에서 CLI 와 GUI
1. CLI : 커맨드 라인 인터페이스 (커맨드창에 명령어를 쳐서 사용)
2. GUI : 사람들이 사용하기 쉽게 프로그램으로 나타냄
  - 소스트리 , 깃 크라켄 등


# Git에 올릴떄 특정 파일과 폴더를 없에고 싶은경우
- node_modules나 , 라이브러리 , 필요없는 대용량파일을 없애고싶다
  - .gitignore 파일을 이용한다 (.gitignore파일도 사용 방법 존재)



# Git 명령어 알아보기
1. git status : 현재 폴더의 변경상황을 확인 할수있음
2. git add 파일명 or * : 원하는 파일을 저장소에 담을 수 있음
3. git commit : add한파일을 저장소에 반영함 (버전 반영)
   - git commit -m "메시지명"  일반적으로 이런식으로 저장소에 반영함
   - git commit -am "메시지명" 새로 추가된 파일이 없을떄 사용가능 (add와 commit을 동시반영)

4. git log
  - commit 로그들을 볼수있음 
5. git diff
 - 현재 폴더의 변경사항을 구체적으로 확인할수있음


# 프로젝트를 과거로 돌아가는 방법
1. reset : 과거로 돌아간뒤 이후 commit은 지워버림
2. revert : 과거로 돌아간뒤 이후 commit은 지워버리지않음
   - 과거로 돌아간 이후 commit한 불필요한 부분을 지울수있음
   - 협업시 주로 사용 (reset 은 위험 )

3. reset 사용법
 1. git -log 로 이전 커밋내역확인
 2.  git reset --hard (돌아갈커밋 해시)
 > 이후 로그는 지워지므로 .git 파일 백업하는거 추천


4. reset하기전 상태로 돌아가는방법
- .git 폴더를 복원하고 , git log 명령어로 커밋해쉬 확인
 - 1. git reset --hard (가장 마지막 커밋로그로 복구)
 - 2. git reset --hard 커밋로그 (해당 커밋로그 시점으로 돌아감)

5. revert 명령어 사용법
 1. git revert 커밋로그 
 2. wq! 저장
 3. confilct발생시 이전에 돌아갈 커밋로그의 파일과 현재 비교해보고 수정후 git revert --continue 명령어
 4. git revert --no-commit (되돌릴  커밋 해시) => 커밋이 되지 않은상태로돌아감

  