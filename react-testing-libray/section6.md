- 테스트 코드 작성

1. toHaveTextContent => 해당 콘텐트의 텍스트 값
2. userEvent.type(vanillaInput, "1"); // 해당 input에값을넣음
3. userEvent.clear // 존재하는 텍스트를 삭제한다.

```jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  //    Scoops total이 0.00이되어야함
  const scoopsSubtotal = screen.getAllByText("Scoops total: $", { exact: false }); // exact :false 부분적인 문자열
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
  await user.clear(vanillaInput); // 해당 input에있는 텍스트를 다지운다.
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00"); //체크했을떄 2.00
});
```

- Provider로 래핑한 컴포넌트 테스팅하는방법 (리덕스도포함)
  > test-utiles 폴더를 만들어서 Provider로 래핑 시킨 context를 만들어서 테스팅 폴더에서 사용

```jsx
// Provider로 래핑한 render메소드
import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";
const renderWithContext = (ui, options) => {
  render(ui, { wrapper: OrderDetailsProvider, ...options });
};
//
export * from "@testing-library/react";
// orverride render method
export { renderWithContext as render };
```

```jsx
// Option.test.jsx
import { render, screen, waitFor } from "../../../test-utiles/testing-library-utils.jsx";

import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);
  // find images
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
