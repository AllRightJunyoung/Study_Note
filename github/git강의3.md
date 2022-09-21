# Git을 왜 쓸까?
1. Git으로 관리하는 프로젝트를 온라인 공간에서 공유해서 프로젝트 구성원끼리 소프트웨어를 만들수있음
2. 팀 구성원들이 동시에 하나의 저장소 작업 수행이 가능해짐
   - 서로의 작업들이 프로젝트에 독립적으로 존재

# Github repository 란?
- 깃허브의 프로젝트 저장소이며 public과 private이 존재
  - public은 모두에게 보여지는 저장소
  - private은 허용된 인원만 볼수있는 저장소

# Github repository(원격 저장소)와 로컬 저장소간의 연결
1. git remote add orgin(원격저장소명 사용자가지정가능) 원격저장소주소
  - 로컬 git저장소를 원격저장소로 연결
2. git branch -M main (기본브랜치명)
  - 메인 브랜치명을 main으로
3. git push -u origin main 
  - 로컬저장소의 커밋내역을 원격으로 push

# git 명령어
1. git clone (원격 저장소 주소)
- 협업할 원격저장소 추가하기

2. git remote
- 원격 저장소 목록 보기

3. git remote remove (origin 등 원격 이름)
- 원격저장소 삭제하기

4. git push
- 로컬 저장소에 반영된것을 원격저장소에 올리기

5. git pull
- 원격저장소에 반영된 내용을 로컬저장소로 가져오기

# pull 할것이 있을떄 push를 한 경우?
> 원격저장소에 반영된게 있을떄 로컬저장소에서 push하면?
1. 원격저장소가 우선순위가 당연히 먼저 되서 push가 되지않음 
- 해결방법 : 
  1. pull을 한다음에 다시 Push 를한다
  2. git pull --no-rebase (merge 방식)
  - 내 로컬 브랜치와 원격브랜치가 나눠지면서 합침
  3. git pull --rebase  (rebase 방식)
  - 원격브랜치를 일단 붙인뒤에 내가 한것들을 붙여버림 


# 내가 작업한 내용과 다른사람이 한 내용이 충돌하는 경우 해결방법? (Conflict)
1. git pull --no-rebase 사용 (merge 방식) 
2. git pull --rebase (rebase 방식)
   - 충돌 난것을 고치고 1.git add * 2. git rebase --continue 충돌이 해결될떄까지 반복
   - pull명령어는 rebase를 해도 괜찮음 

# 로컬의 내역을 강제로 push
- 로컬의 내역들이 원격저장소보다 많이 뒤쳐져있을떄 강제로 push 할수있음
  - git push --force

# 로컬에서 브랜치 만들어서 원격에 push
1. git branch 브랜치명
2. git push -u orgin 브랜치명 (로컬에 있는 브랜치를 원격에 넣는다)
> git branch --all 을 통해서 로컬과 원격에 있는 브랜치를 확인할수있다


# 원격의 브랜치를 로컬에 가져오기
1. git fetch (명령어 사용)
2. git switch -t origin/from-remote(원격브랜치명)
   - 원격에있는 브랜치를 로컬에 가져와서 계속쓰겠다.
3. git pull 

# 원격에 있는 브랜치를 삭제하는 방법
- git push (원격 이름) --delete (원격의 브랜치명)
  - git push origin --delete 원격브랜치명
