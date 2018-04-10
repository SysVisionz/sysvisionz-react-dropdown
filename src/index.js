import React, { Component } from 'react';

//usable props: label, entries, dropDirection, popDirection, orientation, isOpen, controlled, keepOpen
//onToggle, onOpen, onClose
//id, className, style, buttonId, buttonClass, buttonStyle, menuId, menuClass, menuStyle.

const listStyle = (dropDirection, popDirection, orientation, horizontal, offset) => {
	let style = {
		position: 'absolute', 
		display: 'flex', 
		right: undefined, 
		left: undefined, 
		top: undefined, 
		bottom: undefined
	}
	if ((horizontal.pop == null && horizontal.drop) || horizontal.pop){
			style.flexDirection = 'row';
	}
	else{
			style.flexDirection = 'column';
	}
	switch(dropDirection){
		case 'up':
			style.bottom = '100%'
			switch(popDirection){
				case 'left':
					style.right=0;
					break;
				case 'right':
					style.left=0;
					break;
			}
			break;
		case 'left':
			style.right='100%';
			switch(popDirection){
				case 'up':
					style.bottom = 0;
					break;
				case 'down':
				default:
					style.top=0
					break;
			}
			break;
		case 'right':
			style.left='100%'
			switch(popDirection){
				case 'up':
					style.bottom=0;
					break;
				case 'down':
				default:
					style.top=0;
					break;
			}
			break;
		case 'down':
		default:
			switch(popDirection){
				case 'left':
					style.right= 0;
					break;
				case 'right':
					style.left= 0;
					break;
			}
			break;
	}
	if (!popDirection) {
		switch (orientation) {
			case 'top':
				if ((horizontal.pop == null || horizontal.pop == horizontal.drop) && horizontal.drop) {
					style.bottom=0;
					style.top=undefined;
				}
				break;
			case 'bottom':
				if ((horizontal.pop == null || horizontal.pop == horizontal.drop) && horizontal.drop) {
					style.top=0;
					style.bottom=undefined
				}
				break;
			case 'right':
				if ((horizontal.pop == null || horizontal.pop == horizontal.drop) && !horizontal.drop) {
					style.left=0;
					style.right=undefined;
				}
				break;
			case 'left':
				if ((horizontal.pop == null || horizontal.pop == horizontal.drop) && !horizontal.drop) {
					style.right=0;
					style.left=undefined;
				}
				break;
			default:
				break;
		}
	}
	if (offset.top) {
		style.top = offset.top;
		style.bottom = undefined;
	}
	if (offset.left) {
		style.left = offset.left;
		style.right = undefined;
	}
	return style;
}

export default class Dropdown extends Component {

	constructor(props) {
		super(props);
		this.identifier = Math.floor(Math.random()*1000000);
		this.state ={
			isOpen: props.isOpen,
			listClickable: true,
			offset: {top: undefined, left: undefined},
			// if controlled is true, keepOpen defaults to true, unless otherwise defined.
			keepOpen: props.controlled && props.keepOpen == undefined ? props.controlled : props.keepOpen
		}
	}

	componentWillUnmount() {
		// clean up onclick listener if it exists.
		window.removeEventListener('click', this.onClickClose);
	}

	selectedItem = (selection) => {
		// run onSelect function if it exists, and close it if keepOpen prop isn't true.
		if (this.props.onSelect) { this.props.onSelect(selection) }
		if (!this.state.keepOpen) { this.setState({isOpen: false}) }
	}

	componentWillReceiveProps(nextProps){
		// if this is controlled, run the menuToggle function if the isOpen prop has been toggled.
		if (this.props.controlled && this.props.isOpen != nextProps.isOpen){
			this.menuToggle(!nextProps.isOpen);
		}
		// if controlled status or keepOpen status change due to adjustments, change keepOpen state accordingly.
		if (nextProps.keepOpen != this.state.keepOpen || nextProps.controlled != this.props.controlled){
			this.setState({keepOpen: nextProps.controlled && nextProps.keepOpen == undefined ? nextProps.controlled : nextProps.keepOpen});
		}
	}

	componentDidMount() {
		if (this.state.isOpen &&  this.props.orientation == 'center') {
			this.centerMenu()
		}
		if (this.props.isOpen && !this.state.keepOpen){
			window.addEventListener('click', this.onClickClose);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		// Check if update is because list opened or closed.
		if (prevState.isOpen != this.state.isOpen){
			// Checks if component has onToggle, onOpen, or OnClose functions and runs them accordingly.
			if ( this.props.onToggle ) { this.props.onToggle(this.state.isOpen) }
			if ( this.props.onOpen && this.state.isOpen ) { this.props.onOpen() }
			if ( this.props.onClose && !this.state.isOpen ) { this.props.onClose() }
		}
		if ( (this.state.isOpen && this.props.orientation == 'center') && (this.props != prevProps || !prevState.isOpen)){
			this.centerMenu();
		}
		else if (prevProps.orientation == 'center' && this.props.orientation != 'center'){
			this.setState({offset: {top: undefined, left: undefined}})
		}
	}

	centerMenu = () => {
		const topOffset = (document.getElementById(this.buttonId).offsetHeight - document.getElementById(this.menuId).offsetHeight)/2;
		const leftOffset = (document.getElementById(this.buttonId).offsetWidth - document.getElementById(this.menuId).offsetWidth)/2;
		if (!this.horizontal.drop){
			this.setState({offset: {top: undefined, left: leftOffset}});
		}
		else {
			this.setState({offset: {top: topOffset, left: undefined}})
		}
	}

	openMenu = () => {
		// open the menu and make it clickable again, then add the event listener for onClickClose
		// if keepOpen prop isn't true.
		this.setState({isOpen: true, listClickable: true});
		if (!this.state.keepOpen){
			window.addEventListener('click', this.onClickClose);
		}
	}

	onClickClose = evt => {
		// test if you clicked within the menu, close it if you didn't.
		if (!evt.target.closest('.'.concat(this.menuId))){
			this.setState({isOpen: false});
			window.removeEventListener('click', this.onClickClose);
		}
	}

	menuToggle = open => {
		if (this.delayer) {
			clearTimeout(this.delayer);
		}
		if (!this.props.clickableInDelay) {this.setState({listClickable: false})};
		//toggle menu to open or close depending on whether the menu is open at the moment, using the delay if the menu us closing.
		if (!open){
			this.delayer = setTimeout(this.openMenu, this.props.delay);
		}
		else {
			this.setState({isOpen: false, listClickable: true});
			window.removeEventListener('click', this.onClickClose);
		}
	}

	buttonClick = open => {
		//triggered by the activating button, if the menu is not opened or closed by another trigger, open it.
		if (!this.props.controlled) {
			this.menuToggle(open);
		}
	}

	renderMenu = () => {
		return this.props.entries.map((entry, index) => {
			//if entry is constructed with an id variable, use that
			if (entry.id || entry.className) {
				return (
					<div 
						key={'svzDropButton' + this.identifier + index} 
						id={entry.id} 
						className={entry.className ? entry.className : "listEntry"} 
						onClick ={() => {this.selectedItem(entry.children)}}
						style={this.props.listItemStyle}
					>
						{entry.children}
					</div>
				);
			}
			else {
				//if entry is constructed without an id variable or class, assume use as a basic component
				return (
				<div 
					key={'svzDropButton' + this.identifier + index} 
					className={(this.props.listClass || "listEntry")} 
					onClick={() => {this.selectedItem(entry)}}
					style = {this.props.listStyle}
				>
					{entry}
				</div>);
			}
		});
	}

	render() {
		const {
			state, 
			props, 
			renderMenu, 
			menuToggle, 
			buttonClick,
			identifier,
		} = this;
		const {
			dropDirection, 
			popDirection, 
			orientation, 
			label,
			id, 
			menuId,
			className, 
			menuClass, 
			buttonClass,
			style, 
			menuStyle,
			buttonStyle,
			controlled
		} = props;
		const {
			listClickable, 
			isOpen,
			offset
		} = state;
		const drop = dropDirection == 'left' || dropDirection == 'right';
		const pop = popDirection ? popDirection == 'left' || popDirection =='right' : null;
		this.horizontal = {drop, pop};
		const popStyle = listStyle(dropDirection, popDirection, orientation, this.horizontal, offset);
		this.buttonId = (props.buttonId || 'svzDropButton' + identifier);
		this.menuId = (menuId || 'svzMenu' + identifier);
		return (
			<div 
				style = {{position: 'relative', display: 'inline-block', ...style}} 
				className={className} 
				id={id}
			>
				<div 
					id={this.buttonId}
					className={buttonClass}
					style = {{cursor: controlled ? 'pointer' : 'auto', ...buttonStyle}} 
					onClick={() => buttonClick(isOpen)}
				>
					{label}
				</div>
				<div 
					style = {{pointerEvents: listClickable ? 'auto' : 'none'}} 
					hidden={!isOpen}
				>
					<div 
						className={menuClass} 
						id={this.menuId} 
						style={{...popStyle, ...menuStyle}}
					>
						{renderMenu()}
					</div>
				</div>
			</div>
		);
	}
}