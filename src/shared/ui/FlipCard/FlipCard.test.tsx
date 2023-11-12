import '@testing-library/jest-dom'
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { FlipCard } from './FlipCard';

it('should change side on click', () => {
    jest.useFakeTimers();
    const { queryByText, container } = render(<FlipCard frontContent="a" backContent="b" />);
    expect(queryByText("a")).toBeInTheDocument();
    fireEvent.click(container.firstChild);
    act(() => jest.runAllTimers());
    expect(queryByText("b")).toBeInTheDocument();
    jest.useRealTimers();
});

it('should trigger onFlip event', () => {
    const cb = jest.fn();
    jest.useFakeTimers();
    const { container } = render(<FlipCard onFlip={cb} frontContent="a" backContent="b" />);
    fireEvent.click(container.firstChild);
    act(() => jest.runAllTimers());

    expect(cb).toHaveBeenCalled();
    jest.useRealTimers();
});