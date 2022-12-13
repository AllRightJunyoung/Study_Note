import { render } from '@testing-library/react';
import { OrderDetailsProvider } from '../contexts/OrderDetails';
const renderWithContext = (ui, options) => {
  render(ui, { wrapper: OrderDetailsProvider, ...options });
};
//
export * from '@testing-library/react';
// orverride render method
export { renderWithContext as render };
