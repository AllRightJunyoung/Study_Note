# Commit 내역 수정하기
- git commit --amend 사용 (이전의 커밋내역을 수정할수있음)
- git commit --amend -m (메시지 까지 한번에 변경가능)

# 과거의 커밋을 수정하는 방법

- git rebase i 커밋명
  1. p : 커밋 그대로 두기
  2. r : 커밋 메시지 변경
  3. e : 수정을 위해 정지
  4. d : 커밋 삭제
  5. s : 이전 커밋 합치기

# 두개의 작업을 커밋 항목 나누는방법
1. git rebase i 커밋명 하고 e명령어로 해당 시점 수정
2. git reset head~로 이동
3. 변한 부분에 대해 따로 add하고 커밋 
4. git rebase --continue

> 깃은 순차적으로 나열되있으므로 변경사항이후의 내용도 같이 수정해야 됨