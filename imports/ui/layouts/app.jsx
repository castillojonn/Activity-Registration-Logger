import React from 'react';
import { Navigation } from '../components/navigation';

export const App = ( { children } ) => (
    <div>
        <Navigation />
        { children }
    </div>
)
