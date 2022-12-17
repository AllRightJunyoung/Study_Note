## 디버깅하는 방법
1. unable to find role="role" (Error) (역할을 찾지못한다.)
  - name option에 맞지 않거나 element가 존재하지 않은경우 logRoles 유틸리티를 사용해서 액세스 가능한 역할인지 확인
  - screen.debug로 자세히 디버깅가능

2. 업데이트가 act로 래핑되지 않았다 (Warining: An update to component inside a test was not wrapped in act)
- 테스트 완료후에 업데이트가 있었다는 뜻 (await와 findBy*를 사용해서 테스트가 완료되기전에 업데이트를 대기한다)
- 컴포넌트가 언마운트 되어 React 상태 업데이트를 수행할수 없음 오류도 act로 래핑되지 않음 오류와 발생원인 동일

3. Error: connect ECONNrEfused 127.0.0.1
- Mock server work handler가 없다

## 실습 코드 예시 
> 사용자 행위에 맞는 테스트 코드로 생각

~~~ jsx
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

test("Order phases for happy path", async () => {
  const user = userEvent.setup();
  // render app
  // Don't need to wrap in provider; already wrapped!
  render(<App />);

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const chocolateInput = screen.getByRole("spinbutton", { name: "Chocolate" });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);

  // find and click order summary button
  const orderSummaryButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  await user.click(orderSummaryButton);

  // check summary subtotals
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $6.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  // check summary option items
  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // // alternatively...
  // // const optionItems = screen.getAllByRole('listitem');
  // // const optionItemsText = optionItems.map((item) => item.textContent);
  // // expect(optionItemsText).toEqual(['1 Vanilla', '2 Chocolate', 'Cherries']);

  // accept terms and click button
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await user.click(confirmOrderButton);

  // check confirmation page text
  // this one is async because there is a POST request to server in between summary
  //    and confirmation pages
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // find and click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", { name: /new order/i });
  await user.click(newOrderButton);

  // check that scoops and toppings have been reset
  const scoopsTotal = await screen.findByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  // wait for items to appear so that Testing Library doesn't get angry about stuff
  // happening after test is over
  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Cherries" });
});

~~~

## Jest Mock 함수를 함수의 프로퍼티로 전달해야되는 이유
- 테스트 하는 동안 해당 함수를 호출하려고해도 호출함수를 찾을수없으므로
  - jest.fn()

## React Testing Library 사용시 주의점 [https://seongry.github.io/2021/06-20-common-mistakes-with-rty/]
> 중요도 중이상만 적음 
1. Testing Library에 ESLint 플러그인을 설치하고 사용 (중요도 중)
- eslint-plugin-testing-library, eslint-plugin-jest-dom

2. clean up 을 사용하지마라 (중요도 중)
- 오랜 시간동안 clean up은 자동으로 이루어짐

3. screen 사용하기
- 필요한 쿼리를 추가/제거 할 때 render를 호출해 최신 상태로 구조 분해할 필요가 없다
- 쿼리와 디버깅을 위해 screen 사용

4. 잘못된 단언문 사용하지말기 (중요도 높음)
~~~js
const button = screen.getByRole("button", { name: /disabled button/i });// 비추
expect(button.disabled).toBe(true);
// 에러 메세지:
//  expect(received).toBe(expected) // Object.is equality
//
//  Expected: true
//  Received: false
// ✅
expect(button).toBeDisabled();
~~~
5. act 감싸지 말기 (중요도 중간)
~~~js
// ❌
act(() => {
  render(<Example />);
});
const input = screen.getByRole("textbox", { name: /choose a fruit/i });
act(() => {
  fireEvent.keyDown(input, { key: "ArrowDown" });
});
// ✅
render(<Example />);
const input = screen.getByRole("textbox", { name: /choose a fruit/i });
fireEvent.keyDown(input, { key: "ArrowDown" });
~~~

6. 잘못된 쿼리 사용하지 않기 (중요도 높음)
- 최종 사용자가 하는방식에 가깝게 dom을 쿼리

~~~ js
// DOM이 동작한다고 가정하기:
// <label>Username</label><input data-testid="username" />
screen.getByTestId("username"); //사용하지말기 
screen.getByRole("textbox", { name: /username/i }); //사용
~~~

6.1 container를 사용하여 요소 쿼리 하지 않기
~~~js

잘못된 예시
const { container } = render(<Example />);
const button = container.querySelector(".btn-primary");
expect(button).toHaveTextContent(/click me/i);
render(<Example />);
screen.getByRole("button", { name: /click me/i });
~~~

6.2 텍스트 쿼리 하지 않기
~~~ js

// ❌
screen.getByTestId("submit-button");
// ✅
screen.getByRole("button", { name: /submit/i });

~~~

6.3 aria-, role 및 기타 접근성 속성(accessibility attributes)을 잘못 추가하기 (중요도 높음)

~~~js
// ❌
render(<button role="button">Click me</button>);

// ✅
render(<button>Click me</button>);
~~~

7. @testing-library/user-event 사용하기
> fireEvent는 비추

8. 존재 여부를 확인하는 경우 외의 모든 곳에 query* 변형을 사용하기 (중요도 높음)
- 엘리먼트를 찾을수 없을떄 만 사용
~~~ js

// ❌
expect(screen.queryByRole("alert")).toBeInTheDocument();
// ✅
expect(screen.getByRole("alert")).toBeInTheDocument();
~~~

9.find* 로 쿼리할 수 있는 엘리먼트를 waitFor 를 사용하지 말기(중요도 높음)
- 즉시 사용할수 없는 무언가를 쿼리하고싶을떄는 언제든지 find *을 사용
~~~ js

// ❌
const submitButton = await waitFor(() =>
  screen.getByRole("button", { name: /submit/i })
);
// ✅
const submitButton = await screen.findByRole("button", { name: /submit/i });
~~~

10. waitFor 에 빈 콜백을 넘겨주지 말기 (중요도 높음)
> 리팩토링에 쉽게 실패하는 취약한테스트가 된다..
~~~js

// ❌
await waitFor(() => {});
expect(window.fetch).toHaveBeenCalledWith("foo");
expect(window.fetch).toHaveBeenCalledTimes(1);
// ✅
await waitFor(() => expect(window.fetch).toHaveBeenCalledWith("foo"));
expect(window.fetch).toHaveBeenCalledTimes(1);
~~~

11. get * 변형을 단언문 처럼 사용하기
~~~js



~~~