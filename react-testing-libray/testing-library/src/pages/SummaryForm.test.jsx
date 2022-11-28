import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "./SummaryForm";

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
