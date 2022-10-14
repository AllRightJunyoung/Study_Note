## npm 과 yarn에 간략요약

- 노드 패키지 관리자

## npm 과 yarn의 설치방식

- npm은 한번에 하나씩 순차적으로 패키지를 설치한다. (느림)
- yarn은 여러패키지를 동시에 가져와서 설치한다. (빠르다.)

## npm과 yarn의 보안

- npm은 자동으로 패키지에 포함된 다른 패키지 코드를 실행하여 보안시스템에 몇가지 취약성이 발생한다. (보안성에 안좋음)
- yarn은 package.json과 yarn.lock에 있는 파일만 설치한다

## yarn은 자동 lock파일 생성한다

- lock파일의 필요성 : 패키지 파일 버전에 캐럿과 틸드가 명시되면 다른시스템에서 패키지를 설치할떄 패키지 파일에 언급된 버전이 아닌 릴리스된 최신버전을 찾아 설치하는 문제점이 발생한다 (협업시 버전이 다르면 문제가 발생할수있음)

> yarn은 종속성이 추가되면 yarn.lock에 자동으로 추가하여 패키지파일에 언급된 버전을 정확히 깔수있다. (협업시 버전 문제 해결)

# 참고

- <https://joshua1988.github.io/vue-camp/package-manager/npm-vs-yarn.html#npm>
- <https://developer0809.tistory.com/m/128>
