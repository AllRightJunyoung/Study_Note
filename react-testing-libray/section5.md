# MSW

- 쉽게 말하면 가짜 서버
- 요청이 서버에 전달되지않고 MSW에 요청이감

## 실습

```jsx
import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("displays image for each scoop option from server", () => {
  render(<Options optionType="scoops" />);
  // find images
  const scoopImages = screen.getAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
```
