import { queryByText, render, screen } from '@testing-library/react';
import SummaryForm from './SummaryForm';
import userEvent from '@testing-library/user-event';

test('체크 박스가 체크가 안되어있을때 버튼은 disabled되어야된다', () => {
  render(<SummaryForm />);

  const button = screen.getByRole('button', { name: /confirm order/i });
  const checkbox = screen.getByRole('checkbox');

  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test('체크 박스를 클릭하면 버튼 enable, 체크박스를 다시클릭하면 disable', async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const button = screen.getByRole('button', { name: /confirm order/i });
  const checkbox = screen.getByRole('checkbox');
  await user.click(checkbox);
  expect(button).toBeEnabled();
  await user.click(checkbox);
  expect(button).toBeDisabled();
});

test('popover responds to hover', async () => {
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
