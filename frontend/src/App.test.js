import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

test('renders title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Task Manager/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders task board', () => {
	render(<App />);
  const todoElement = screen.getByText(/To Do/i);
  const inprogElement = screen.getByText(/In Progress/i);
  const doneElement = screen.getByText(/Done/i);
  expect(todoElement).toBeInTheDocument();
  expect(inprogElement).toBeInTheDocument();
  expect(doneElement).toBeInTheDocument();
});
