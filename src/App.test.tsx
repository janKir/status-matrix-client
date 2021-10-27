import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { App } from './App';

describe('App.tsx', () => {
  test('has title', () => {
    const { getByText } = render(<App />);
    expect(getByText('Hello Vite + React!')).toBeDefined();
  });

  test('initial counter is 0', () => {
    const { getByText } = render(<App />);
    expect(getByText('count is:', { exact: false }).textContent).toContain('0');
  });

  test('click on button increments counter', () => {
    const { getByText } = render(<App />);
    const button = getByText('count is:', { exact: false });
    fireEvent.click(button);
    expect(button.textContent).toContain('1');
  });
});
