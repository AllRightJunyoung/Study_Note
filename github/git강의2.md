# Branch
- 분기된 가지 (다른차원)
- 프로젝트를 하나 이상으로 관리하기위해 사용
  - 배포용 , 테스트서버용 , 새로운시도 , 새로운기능 추가, 긴급수정

# Branch 명령어
1. git branch "브랜치명" : 브랜치 추가
2. git branch : 현재 브랜치 목록
3. git switch 브랜치명 : 해당 브랜치로 전환
4. git switch -c new-teams : 브랜치 생성과 동시에 이동하기
5. git branch -d 삭제할 브랜치명 : 브랜치 삭제
6. git branch -m 기존브랜치명 새브랜치명 : 브랜치 이름 바꾸기

# Branch 합치는방식
1. merge : 두 브랜치를 하나의 커밋에 이어 붙임
- 브랜치 사용내역을 남길 필요가 있을떄 적합

2. rebase : 브랜치를 다른 브랜치에 이어 붙임
- 브랜치 사용내역을 남길 필요가 없고 한줄로 깔끔히 정리된 내역을 유지하기 원할떄 적합
- 협업에서는 비추하는 방식


# merge로 합쳐보기
> main 브랜치와 add-coach 브랜치 내용을 합칠것이다.
1. git merge add-coach (main)
2. git branch -d add-coach (합쳐졌으므로 지움)

# rebase로 가지 추가시키기
> new-teams의 내용들을 main브랜치로 추가시킬것이다 (rebase는 merge와 반대)
1. new-teams 브랜치로 이동후 git rebase main
2. new-teams는 가지가 추가된게 반영됬으나 main 으로 이동시 아직 new-teams의 것들이 반영안되있음
3. main으로 이동해서 git merge new-teams 로 반영시킴
4. git branch -d new-teams


# 브랜치간 Merge 충돌 해결하기
- 파일의 같은 위치에 다른내용이 입력된 상황
  - 예시로 똑같은 파일에 대한 main branch의 내용과 conflict-1 브랜치의 내용이 다르다
~~~ yaml
team: Tigers

1. 반영사항 선택
<<<<<<< HEAD
manager: Kenneth //현재 브랜치 파일은  이런데 
=======
manager: Deborah // 다른 브랜치파일은 이렇다
>>>>>>> conflict-1 

coach : Grace

members:
- Linda
- William
- David
2. git commit 하면 merge됨
~~~


# 브랜치간 rebase 충돌 해결하기
1. 충돌한 부분을 수정한 뒤 git add * 
2. git rebase --continue (충돌이 모두 해결 될때까지 반복한다 , 가지하나하나를 추가하는것이므로)
3. 해결한뒤 git merge 브랜치명ㅇ르 하면됨

# 브랜치간 merge, rebase 충돌시 작업 취소 하기
- git merge --abort 사용
- git rebase --abort 사용


