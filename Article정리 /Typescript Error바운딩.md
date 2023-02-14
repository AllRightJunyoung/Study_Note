# try catch에서 Error 타입 씌우는 방법

- [참고] :https://immigration9.github.io/typescript/2022/01/09/error-typescript.html

```ts
const reportError = ({ message }) => {
  // 로깅서비스로 에러 전송
};

const reportError = ({ message }: { message: string }) => {
  // 로깅서비스로 에러 전송
};

try {
  throw new Error("Oh no!");
} catch (error) {
  // 진행은 하겠지만, 리포트는 전송하자.
  reportError({ message: error.message }); //error.message에서 에러가발생한다
  // error타입은 unknown을 기본값으로 갖기때문이다
}
// 에러는 어떻게든 던질수있다. (unknow을 기본값으로 가지기 때문)
throw "What the!?";
throw 7;
throw { wut: "is this" };
throw null;
throw new Promise(() => {});
throw undefined;
```

But

```ts
try {
  throw new Error("Oh no!");
} catch (error: Error) {
  // 진행은 하겠지만, 리포트는 전송하자.
  reportError({ message: error.message });
}
// Catch clause variable type annotation must be 'any' or 'unknown' if specified. ts(1196) 라는 에러를 발생

이유는 아래와같다
Error = function () {
  throw "Flowers";
} as any; 객체를 몽키패칭하여 의도치하지 않은 것을 던질수있기때문이다.
```

그러면 어떻게 오류 없이 에러에 타입을 씌우냐?

```ts
try {
  throw new Error("Oh no!");
} catch (error) {
  let message = "Unknown Error";
  if (error instanceof Error) message = error.message;
  reportError({ message });
}
```

유틸함수로 분리하기

```ts
function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}
const reportError = ({ message }: { message: string }) => {
  // 로깅서비스로 에러 전송
};

try {
  throw new Error("Oh no!");
} catch (error) {
  // 진행은 하겠지만, 리포트는 전송하자.
  reportError({ message: getErrorMessage(error) });
}
```

리뷰어가 에러 처리하는방법
Cutstom Error를 별도로 만들어서 세부적으로 상속하는 에러클래스를 만듬

```ts
class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomError";
  }
}

class ValidationError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

function reportError(error: unknown) {
  if (error instanceof CustomError) {
    if (error instanceof ValidationError) {
      alert(error.message);
    }
    //  ...
    return;
  }
  // report Error with level high
}
```

> Custom Error를 instanceof를 통해 활용하면 프로젝트 내에서 일관적으로 에러처리하는데 유용할 것 같아요
