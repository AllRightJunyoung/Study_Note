# Git은 스냅샵 방식을 쓰고 분산 시스템 관리방식

- 새로운 버전이 만들어질때 해당 버전에서 각파일이 최종 상태 그대로 저장됨
- 협업을 하는 구성원들이 Git의 상태까지 공유하고 있음


# Git 의 3가지 공간 (매우중요)

1. Working directory
- untracked : add가 된적이 없는 파일 ,ignore 된파일 
- tracked : add된 적 있고 변경내역이 있는 파일

2. Staging area
- Working directory에서 git add하면 이동하는곳
- 커밋을 준비하기 위한 단계

3. Repository
- commit된 파일이 들어있음

# 파일 삭제와 이동
1. git rm
- git rm 파일명 하면 파일 삭제 
- Staging area로 이동함
- git reset --hard로 복원

2. git mv
- 파일 이름을 바꿈
- git mv tigers.yaml zzamtigers.yaml로
- Staging area로 이동함


# Staging area에서 Working directory로 이동하는방법
- git restore --staged (파일명)
  - 실수로 git add 한것을 취소시킴 
  - 수정된 파일 반영 o 

- git restore 파일명
  - 수정된파일은 반영안함 x 이전으로 커밋상태로 돌아감 (working directory에서 까지 날림)


# git reset 옵션 (중요)
1. git reset --soft : repository에서 staging area로이동
   - 커밋 반영 지우고 , add된상태로
2. git reset --mixed(default) : repository에서 working directory로 보냄 (파일 자체 변화 x)
3. git reset --hard : 수정사항을 완전히 삭제 (working directory에서 까지 날림)


# git Head 란?
- 현재 속한 브랜치의 가장 최신 커밋

# checkout 명령어로 이동하기
1. git checkout HEAD^
 - Head의 이전으로 이동 (^의개수에 따라 뒤로 이동)
2. git checkout -
 - 이동한것을 한단계 되돌리기 (Ctrl+z)
 - - 대신 커밋해쉬를 사용해도 그시점으로 이동

3. git checkout으로 해당 커밋으로 이동한뒤 브랜치를 새로 분기할수있음

4. git reset HEAD(원하는 단계) (옵션) 으로 해당 브랜치로 이동후 Reset가능
 - git reset --hard HEAD~2


> git switch로 다른 브랜치의 head로 이동 가능


# fetch 와 pull의 차이
1. fetch : 원격 저장소의 최신 커밋을 로컬로 가져옴
2. pull : 원격 저장소의 최신 커밋을 로컬로 가져와 merge 또는 rebase





