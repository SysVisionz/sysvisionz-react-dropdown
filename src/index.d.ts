import {FC, ReactNode} from 'react';
export type Props = {
    /** orientation is the alignment of the elements. The default is left. */
	orientation?: 'top' | 'bottom' | 'left' | 'right',
    /** onClose is the function that triggers when the element is closed */
	onClose?: () => void,
	onOpen?: () => void,
	onClick?: () => void;
	pop?: 'up'| 'down'| 'right'| 'left',
	drop?: 'up'| 'down'| 'right'| 'left',
	fade?: boolean,
	slide?: boolean
}

/** The SysVisionz Dropdown is a module for building dropdown menus that are powerful and versatile, while still accomodating automated functionality*/
declare const Dropdown: FC<Props>
