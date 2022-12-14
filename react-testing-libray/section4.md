- 체크 박스 테스팅

# 실습

```jsx
test("체크 박스가 체크가 안되어있을때 버튼은 disabled되어야된다", () => {
  render(<SummaryForm />);

  const button = screen.getByRole("button", { name: /confirm order/i });
  const checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i });

  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test("체크 박스를 클릭하면 버튼 enable, 체크박스를 다시클릭하면 disable", () => {
  render(<SummaryForm />);

  const button = screen.getByRole("button", { name: /confirm order/i });
  const checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
});
```

## userEvent 테스트

- FireEvent에비해 userEvent가 더좋다 (https://testing-library.com/docs/ecosystem-user-event/)
  - userEvent가 사용자 이벤트를 더욱 완전하고 현실적인 방식으로 시뮬레이션한다.
- npm install --save-dev @testing-library/user-event @testing-library/dom
  - dev 의존성과 , 그냥 의존성 차이는 이제 없어져서 --save dev안해도 상관업슴

```jsx
test("체크 박스를 클릭하면 버튼 enable, 체크박스를 다시클릭하면 disable", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const button = screen.getByRole("button", { name: /confirm order/i });
  const checkbox = screen.getByRole("checkbox");
  await user.click(checkbox);
  expect(button).toBeEnabled();
  await user.click(checkbox);
  expect(button).toBeDisabled();
});
```

- Screen 쿼리 메소드

  - 스크린(Dom)에 있는 구성요소를 가져올수있음
  - docs : https://testing-library.com/docs/queries/about/#screen
  - Single Element (getBy, queryBy , findBy)
  - Multiple Elements (getAllBy, queryAllBy , findAllby)

- expect().not.toBeInTheDocument()
  - 문서에 있는지 없는지 확인

## popover 테스트

```jsx
test("popover responds to hover", async () => {
  // 1. 체크를 했을때 팝오버가 화면상에서 숨겨지는게 아닌 페이지에서 더이상 존재안함
  const user = userEvent.setup();
  render(<SummaryForm />);

  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
  expect(nullPopover).not.toBeInTheDocument();

  // 2. hover했을떄  popoverItem이 생긴다
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // 3. hover를 땟을떄 popoverItem은 다시 사라진다.
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
```
