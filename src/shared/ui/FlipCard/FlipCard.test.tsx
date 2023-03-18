import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FlipCard } from './FlipCard';

it('should change side on click', () => {
    const { queryByText, container } = render(<FlipCard frontContent="a" backContent="b" />);
    expect(queryByText("a")).toBeInTheDocument();
    fireEvent.click(container.firstChild);
    expect(queryByText("b")).toBeInTheDocument();
});

it('should trigger onFlip event', () => {
    const cb = jest.fn();
    const { container } = render(<FlipCard onFlip={cb} frontContent="a" backContent="b" />);
    fireEvent.click(container.firstChild);

    expect(cb).toBeCalled();
});