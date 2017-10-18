import React from 'react';
import { Navigation } from '../components/Navigation';

export const App = ( { children } ) => (
    <div>
        <Navigation />
        { children }
    </div>
)
