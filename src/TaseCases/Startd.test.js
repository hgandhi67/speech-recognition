import React from 'react';
import { render } from '@testing-library/react-native';
import Started from '../Pages/Others/Started';

describe('MyComponent', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Started />);
    const element = getByText('A new kind of language teacher');
    expect(element).toBeTruthy();
  });
});

describe('MyComponent', () => {
  it('renders button text correctly', () => {
    const { getByText } = render(<Started />);
    const element = getByText('Get Started');
    expect(element).toBeTruthy();
  });
});
