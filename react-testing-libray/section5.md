# MSW

- 쉽게 말하면 가짜 서버
- 요청이 서버에 전달되지않고 MSW에 요청이감

## 서버로부터 오는 데이터를 처리 하고싶다?
- async await와 findAllByRole을 사용

## 실습

> 서버로부터 가져온 데이터가 올바르게 렌더링됬는지
- async await 를 사용하여 서버로부터 오는 데이터를 가져옴

```jsx
import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);
  // find images

  // msw로부터 데이터를 받아오기때문에 await사용
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each toppings option from server", async () => {
  render(<Options optionType="toppings" />);
  // find images
  const toppingsImages = await screen.findAllByRole("img", { name: /topping$/i });
  expect(toppingsImages).toHaveLength(3);

  // confirm alt text of images
  const altText = toppingsImages.map((element) => element.alt);
  expect(altText).toEqual(["Cherries topping", "M&Ms topping", "Hot fudge topping"]);
});
```

## getAllByRole 쿼리

- 특정한 정규 표현식 이름을 가진 이미지 역할에대해 매칭하여 가져오는 용도로 사용

## 서버로부터 에러핸들링하는방법

> 서버로부터 데이터를 요청해서 두개를 받는지 확인하는 테스트코드

```jsx
// .only 키워드를 통해 해당파일의 한가지만 테스팅가능
// .skip은 해당 테스트 skip

test.only("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http//localhost:3030/scoops", (req, res, ctx) => res(ctx.status(500))),
    rest.get("http//localhost:3030/toppings", (req, res, ctx) => res(ctx.status(500)))
  );
  render(<OrderEntry />);
  const alerts = await screen.findAllByRole("alert", { name: "An unexpected error ocurred. Please try agian later." });
  expect(alerts).toHaveLength(2);

  // 위코드는 배열을 한개 받는 오류가 발생 (비동기적으로 처리하기 떄문)

  // 아래 코드로 해결이가능하다. waitFor메소드 2개를 받을떄까지 기다림

  test.only("handles error for scoops and toppings routes", async () => {
    server.resetHandlers(
      rest.get("http//localhost:3030/scoops", (req, res, ctx) => res(ctx.status(500))),
      rest.get("http//localhost:3030/toppings", (req, res, ctx) => res(ctx.status(500)))
    );
    render(<OrderEntry />);
    await waitFor(async () => {
      const alerts = await screen.findAllByRole("alert");

      expect(alerts).toHaveLength(2);
    });
  });
});
```

## waitFor 메소드

- 서버로부터 데이터를 가져올떄 사용 (비동기적처리에)

## npm test

- p를 이용하면 테스트파일의 패턴을 입력하여 원하는 테스트 만 실행시킬수있음
- test.only와 skip을 이용하여 해당 테스트파일 내부의 테스트들을 골라서 실행시킬수있음
