import React from 'react';

const NavigationContext = React.createContext({
    navigationContext: {
        push: () => { console.error('invalid navigator'); }
    }
});

export default NavigationContext;
