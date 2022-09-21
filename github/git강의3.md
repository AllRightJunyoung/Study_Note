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

