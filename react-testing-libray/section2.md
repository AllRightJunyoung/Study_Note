# 실습 위주

레퍼런스

- [https://testing-library.com/docs/queries/byrole]

- getByRole() => 특정 element를선택

- expect 속성
  - toHaveStyle => 스타일을 가지고있는지

-logRoles => 해당 컴포넌트의 정보를 출력할수있음

```js
export const replaceCameWithSpaces = (colorName) => {
  // 즉 한단어내의 내부에서 대문자 or 다수의 대문자를 발견할시 수행
  return colorName.replace(/\B([A-Z]\B/g, " $1");
};

test("이름이 Change to blue이고 빨간색 배경색을 가지고 있는 버튼이다", () => {
  render(<App />);
  // button의 역할을 찾고  Change to blue라는 이름을찾는다.
  const colorsButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorsButton).toHaveStyle({ backgroundColor: "red" });
});

test("버튼 테스트 ", () => {
  render(<App />);
  // button의 역할을 찾고  Change to blue인  버튼을 찾는다.
  const colorsButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorsButton).toHaveStyle({ backgroundColor: "red" });

  스타일을 가지는 지 확인



  // 버튼을 눌렀을떄 색깔이 파란색이어야한다.
  fireEvent.click(colorsButton);
  expect(colorsButton).toHaveStyle({ backgroundColor: "blue" });

  // 버튼의 내용은 Change to red여야한다.
  expect(colorsButton.textContent).toBe("Change to red");
});

test("initial conditions", () => {
  render(<App />);

  // 버튼이 활성화됬는지
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toBeEnabled();

  // 체크 박스가 체크가 안된지
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

// 체크 박스를 눌렀을떄  버튼은 비활성화 되어있다.
// 체크 박스를 한번 더 누르면 버튼은 활성화된다.
test("checkbox", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button", { name: "button" });

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});
// 버튼이 비활성일떄 gray색깔 , 활성화될떄 red색깔
test("checkbox", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button", { name: "button" });
  //  버튼이 비활성일떄
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "gray" });
  // 버튼이 활성화될떄
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "red" });
});
```

# 유닛 테스트 권장사항

- 기능 테스트하기엔 너무 논리가 복잡한경우 , 엣지케이스가 너무많은 경우 사용
- 기능 테스트의 실패 원인을 판단하기위해도 사용
  - 기능에 대한 여러 경우를 생각해서 테스팅을 한다 (테스트 그룹화)

# 유닛 테스트 메소드 및 예시

```js
describe ('이름')
  - 테스트를 그룹화한다.
describe('spaces before camel-case capital letters',()=>{
  test('Works for no inner capital letters',()=>{
    expect(replaceCameWithSpaces('Red')).toBe('Red')
  });
  test('Works for one inner capital letters',()=>{
    expect(replaceCameWithSpaces('Blue')).toBe('Blue')
  })
})
```

-
