# 증가형 DOM vs Virtual Dom

## Virutal Dom의 간단한 동작 원리

1. UI가 변경되면 전체 UI를 Virutal DOM으로 렌더링
2. 현재 Virtual DOM과 이전 Virtual DOM을 비교해 차이를 계산한다.
3. 변경된 부분을 실제 DOM에 반영

## Incremental DOM의 간단한 동작 원리

1. 코드변경점을 찾을떄 실제 DOM을 사용하여 VirutalDom보다 간단한 접근 방식을 제공
   - VirutalDom과 달리 DOM을 생성하지 않고 실제 DOM으로비교
2. 명령 묶음을 통해 모든 컴포넌트를 컴파일하여 DOM트리를 생성하고 변경점을 찾음

## Incremental DOM의 장점

- 명령묶음으로 컴파일하여 컴포넌트들을 컴파일 할떄 사용하지 않는 명령을 식별하는데 도움을 준다. (Tree Shaking) => 사용하지 않는 명령묶음을 제거함 => 컴파일 과정에서
  > 추측 : 사용안하는 명령묶음들을 제거하니까 메모리도 줄어든다고생각함

- 명령 묶음이란?
  - 컴포넌트기반으로 만들어진 instruction들의 집합

- 메모리를 효율적으로 사용한다
  - why ? : Virutal DOM과 달리 실제 DOM을 복사하지 않는다, UI 변경이 없을떄 메모리 할당을 하지않음 (증가형돔과 다르게 대부분은 다시 렌더링을 한다. => 쓸떄없는 메모리 소모)

## Incremental Dom의 단점
- Virtual DOM보다 메모리 효율은 좋지만 시간적 비용이 더든다
  > 컴파일 기반 vs인터프리터 기반

# 추론

1. 명령묶음 이라고 하는데 그 명령묶음은 무엇이며 어떻게 만드는 것인가?

- 명령 묶음: 컴포넌트기반으로 만들어진 instruction들의 집합
  1. 컴포넌트 기반으로 instucrction들을 생성
  2. instruction들중에서 사용하지 않는 부분을 지우고 (TreeShaking)
  3. 컴파일
  4. InMemory DOM 생성
  5. InMemory DOM와 RealDOM비교
  
2. 시간복잡도가 virtual DOM보다 높다는데, 어째서 그런것인가? 만들어진 DOM과 Real DOM을 비교한다고 하는데 diff를 어떻게 하길래 시간복잡도가 높은 것인가??

- 증가형 돔은 컴파일후 diff를 하는거같은데 , VirtualDOM은 컴파일하지 않고 인터프리터 기반으로 사용된다고 적혀있네요
  - 컴파일은 모든 명령들을 한번에 묶어서 번역을하기떄문에 인터프리터가 번역시간이 훨신 빠르다고 들은거같습니다 (실행속도는 컴파일러가 더빠르지만)

# 참고

- <https://ui.toast.com/weekly-pick/ko_20210819>
