import React from 'react';
import { render } from '@testing-library/react';
import FoodManager from './index';

it('renders without crashing', () => {
    console.log("hi")
    const { getByText } = render(<App />);
    expect(getByText('Learn React')).toBeInTheDocument();
});
