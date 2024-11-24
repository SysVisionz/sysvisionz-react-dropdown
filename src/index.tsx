import { ReactNode, type FC } from 'react';
import ContextProvider from './context';

const filterJoin = (arr: (string | [string, boolean])[], joinVal = ' ') => arr.reduce((full: string[], val) => {
	Array.isArray(val)
	? val[1] && full.push(val[0])
	: val && full.push(val);
	return full;
}, []).join(joinVal)

type CoreProps = {
	className: string,
	onChange: (value: string) => void,
	options?: (string | {value: string, content: string | ReactNode})[],
	onClose?: () => void,
	onOpen: () => void,
	animation: 'fade' | 'slide',
}
type Dropdown = FC<{
}>
function Dropdown({}:) => {
	
	return <ContextProvider>
		{content}
	</ContextProvider>
}