import {FC, ReactNode, useEffect, useRef, useState} from 'react';
import SVZDropdownContext from './Context';

const Option: FC<{
    value?: string | number, 
    children?: ReactNode, 
    onClick?: (value: string | number) => void, 
    disabled?: boolean
    hidden?: boolean
}> = ({value, children, onClick, disabled, hidden}) => {
    const [val, setVal] = useState<string | number>(value)
    const valContainer = useRef<HTMLDivElement>(null)
    useEffect(() => {
        valContainer.current && !value && setVal(valContainer.current.innerText)
    }, [children])
    const onClickVal = onClick
    return <SVZDropdownContext.Consumer>{
        ({addOption, onClick = onClickVal}) => {
            addOption(value, children)
            return hidden ? null : <div ref={valContainer} onClick={() => onClick(val)}>{children}</div> 
        }
    }</SVZDropdownContext.Consumer>
}
export default Option;