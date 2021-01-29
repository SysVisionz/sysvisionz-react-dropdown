import React, {useRef, useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import SVZObject from 'svz-object'
import './scss/Dropdown.scss';

const filterJoin = (arr, joinVal = ' ') => {
	for (const i in arr){
		if(arr[i] && typeof arr[i] === 'object'){
			arr[i] = arr[i][1] ? arr[i][0] : null;
		}
	}
	return arr.filter(a => a).join(joinVal)
}

const Dropdown = props => {
	const [open, setOpen] = useState(false)
	const [transitioning, setTransitioning] = useState(false)
	const [transitionTimer, setTransitionTimer] = useState(null);
	const contentDiv = useRef(null);
	const [clickedMenu, setClickedMenu] = useState(null);
	const clickOutside = useRef(() => {
		setTimeout(() => {
			if (clickedMenu){
				setClickedMenu = false;
			}
			else {
				 toggleMenu(false);
			}
		}, 10)
	})
	const popStyling = () => {
		const {transition = (props.slideIn ? 400 : 0), fadeIn, slideIn, drop, pop} = props;
		const horizontal = {
			drop: drop === 'left' || drop === 'right',
			pop: pop === 'left' || pop ==='right'
		}
		let style = {
			width: (open || !horizontal.pop) && contentDiv && contentDiv.current ? contentDiv.current.scrollWidth : 0,
			height: (open || horizontal.pop) && contentDiv && contentDiv.current ? contentDiv.current.scrollHeight: 0,
		}
		return style;
	}

	const toggleMenu = open => {
		const {onToggle, onOpen, onClose, transition = (props.slideIn ? 400 : 0) } = props;
		if (onToggle){
			onToggle(open);
		}
		if (open){
			document.addEventListener('click', clickOutside.current)
			if (onOpen){
				onOpen();
			}
		}
		if (!open){
			document.removeEventListener('click', clickOutside.current);
			if(onClose){
				onClose();
			}
		}
		setOpen(open)
		setTransitioning(true)
		clearTimeout(transitionTimer);
		setTransitionTimer(setTimeout(() => setTransitioning(false), transition))
	}

	useEffect(() => {
		if (props.open !== open){
			toggleMenu(open);
		}
	}, [open, props.open])

	useEffect(() => {
		toggleMenu(props.open);
	},[])

	const onChange = retval => {
		const {onChange, keepOpen} = props;
		if (!keepOpen){
			toggleMenu(false);
		}
		return onChange ? onChange(retval) : null;
	}

	const buildButton = () => {
		const {children, button, controlled} = props;
		return (<div className="svz-dropdown-button" onClick={() => !controlled ? toggleMenu(!open) : null}>{children || button}</div>)
	}

	const menuClass = () => {
		const {menuClass, drop = 'down', orientation, slideIn, fadeIn, pop = drop} = props;
		return filterJoin(["svz-dropdown-menu", 'drop-' + drop, 'pop-' + pop, ['orient-' + orientation, orientation], ['active', open], ['transitioning', transitioning], ['slide-in', slideIn], ['fade-in', fadeIn]])
	}

	const {keepOpen, id, className, content, pop = props.drop} = props;
	const menuStyle = popStyling();
	return (
		<div id={id} className={filterJoin(["svz-dropdown-container", className, ['active', open]])}>
			<div className="svz-dropdown-sub-container" >
				{buildButton()}
				<div 
					style={menuStyle} 
					className={menuClass()}
					onClick = {() => setClickedMenu(keepOpen)} 
				>
					<div 
						className={filterJoin(['menu-content', ['active', open]])}
						ref={contentDiv}
					>
						{content.map( (elem, index) => <div 
								key= {`svz-dropdown-list-elem-${(id  || '') + index}`} 
								onClick={() => !keepOpen ? toggleMenu(false) : setClickedMenu(keepOpen)}
								className={'svz-dropdown-list-elem'}
							>
								{elem}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

const Selector = props => {
	const [selection, setSelection] = useState(props.label),
	onChange = selection => {
		setSelection(selection)
		if (props.onChange){
			props.onChange(selection);
		}
	}
	useEffect(() => {
		if (props.label !== selection){
			setSelection(selection);
		}
	}, [props.label])
	return (
			<Dropdown 
				{...props}
				content={props.options} 
				onChange={i => onChange(i)}
			>
				{selection}
			</Dropdown>
	)
}

Dropdown.propTypes={
	onChange: PropTypes.func,
	options: PropTypes.array,
	orientation: PropTypes.string,
	onClose: PropTypes.func,
	onOpen: PropTypes.func,
	pop: PropTypes.string,
	drop: PropTypes.string,
	fade: PropTypes.bool,
	slide: PropTypes.bool,
}

export {Dropdown as default, Selector}