import { useContext, useEffect, type FC, type ReactNode } from "react";
import { context } from "./context";


function Option ({selected, children}: {selected?: boolean, children: string}): ReturnType<FC>
function Option ({value, selected, children}: { value: string, selected?: boolean, children: string | ReactNode }): ReturnType<FC>
function Option ({value, selected, children}: { value?: string, selected?: boolean, children: string | ReactNode }): ReturnType<FC> {
	const {isSpecial, setSpecial} = useContext(context);
	useEffect(() => {
		if (typeof children !== 'string' && !isSpecial ){
			setSpecial(true);
		}
	})
	if (!isSpecial){
		<option value=""></option>
	}
	return <div></div>
}