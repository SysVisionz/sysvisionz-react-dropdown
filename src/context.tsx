import { createContext, FC, ReactNode, useState } from "react";

export const context = createContext({	isSpecial: false, setSpecial: (value: boolean) => {} });

const ContextProvider: FC<{children: ReactNode}> = ({ children}) => {
	const [isSpecial, setSpecial] = useState(false);
	return <context.Provider value={{ isSpecial, setSpecial } }>{children}</context.Provider>
}

export default ContextProvider