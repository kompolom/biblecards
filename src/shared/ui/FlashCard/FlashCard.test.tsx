import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { FlashCard } from './FlashCard';

it('should render front side by default', () => {
  const { queryByText } = render(
    <FlashCard
      frontContent={<span>front</span>}
      backContent={<span>back</span>}
    />,
  );
  expect(queryByText('front')).toBeInTheDocument();
  expect(queryByText('back')).not.toBeInTheDocument();
});

it('should render back side', () => {
  const { queryByText } = render(
    <FlashCard
      side="back"
      frontContent={<span>front</span>}
      backContent={<span>back</span>}
    />,
  );
  expect(queryByText('front')).not.toBeInTheDocument();
  expect(queryByText('back')).toBeInTheDocument();
});
