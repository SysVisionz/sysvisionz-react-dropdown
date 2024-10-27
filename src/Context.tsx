import {createContext, ReactNode} from 'react';
const SVZDropdownContext = createContext<{
    options: any[], 
    selected: any, 
    addOption: (value: string | number, component: ReactNode) => void, 
    onClick: (value: string | number) => void | null
    setSelected: React.Dispatch<any>
    
}> ({
	options: [],
    selected: null,
    setSelected: null,
    addOption: null,
    onClick: null
})

export default SVZDropdownContext