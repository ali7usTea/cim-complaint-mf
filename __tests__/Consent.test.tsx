import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import Consent from '../app/(main)/components/Account/Consent';

// Mock the DataPanel component
jest.mock('cim-ui-components/dist/components/DataPanel', () => ({
    __esModule: true,
    default: jest.fn(({ preColumn }) => (
        <div>
            DataPanel
            {preColumn}
        </div>
    )),
}));

test('renders Consent component correctly', () => {
    // Render the component with a mock query
    // render(<Consent />);

    expect(screen.getByTitle('Consent')).toBeInTheDocument();

    // Check the href attribute of the Links
    const actionReportLink = screen.getByTitle('Consent');
    expect(actionReportLink).toHaveAttribute('href', '/debugReport?query=getCustomerPromotionalConsent');

    
});
