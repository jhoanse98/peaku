import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Losts from '../components/Losts'


describe('Losts Energy Component', () => {
    it('Should render correctly', () => {
        const { getByTestId } = render(<Losts />);
        expect(getByTestId('container')).toBeInTheDocument();
    })

    it('Should renders title and graphic container', () => {
        const { getByText, getByTestId } = render(<Losts />);
        expect(getByText('Losts Energy')).toBeInTheDocument();
        expect(getByTestId('chart')).toBeInTheDocument();
    });

    it('Should renders legend items.', async () => {
        const { getByTestId } = render(<Losts />);
        await waitFor(() => getByTestId('chart'));
        const chart = getByTestId('chart');
        expect(chart).toHaveAttribute('width', '800');
        expect(chart).toHaveAttribute('height', '400');
    });

    it('Should calls useEffect when svgRef changes.', () => {
        const useEffectSpy = jest.spyOn(React, 'useEffect');
        const { rerender } = render(<Losts />);
        rerender(<Losts />);
        expect(useEffectSpy).toHaveBeenCalledTimes(2);
    })
})