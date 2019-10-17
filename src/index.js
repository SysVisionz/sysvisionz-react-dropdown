import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./scss/dropdown.scss";
//usable props: label, entries, dropDirection, popDirection, orientation, isOpen, controlled, keepOpen
//onToggle, onOpen, onClose
//id, className, style, 

const filterJoin = (arr, joinVal = ' ') => {
	for (const i in arr){
		if(arr[i] && typeof arr[i] === 'object'){
			arr[i] = arr[i][1] ? arr[i][0] : null;
		}
	}
	return arr.filter(a => a).join(joinVal)
}

export default class Dropdown extends Component {

	constructor(props){
		super();
		this.openButton = React.createRef();
		this.contentDiv = React.createRef();
		this.containerDiv = React.createRef();
		this.state = {open: props.isOpen || false}
		this.id=Math.round(Math.random()*1000);
	}
	
	popStyling = () => {
		const {open} = this.state;
		const {transitionTime = 400, fadeIn, slideIn, drop, pop} = this.props;
		const horizontal = {
			drop: drop === 'left' || drop === 'right',
			pop: pop === 'left' || pop ==='right'
		}
		let style = {
			width: (open || !horizontal.pop) && this.contentDiv.current ? this.contentDiv.current.scrollWidth : 0,
			height: (open || horizontal.pop) && this.contentDiv.current ? this.contentDiv.current.scrollHeight: 0,
		}
		let transition = [];
		if (fadeIn){
			transition.push('opacity ' + transitionTime + 'ms ease');
		}
		if (slideIn){
			transition.push('width ' + (horizontal.pop ? transitionTime + 'ms' : '0ms') + ' ease');
			transition.push('height ' + (!horizontal.pop ? transitionTime + 'ms' : '0ms') + ' ease');
		}
		style.transition=transition.join(', ')
		return style;
	}

	toggleMenu = open => {
		const {onToggle, onOpen, onClose} = this.props;
		if (onToggle){
			onToggle(open);
		}
		if (open){
			document.addEventListener('click', this.clickOutside)
			clearTimeout(this.openDelay)
			if (onOpen){
				onOpen();
			}
		}
		if (!open){
			document.removeEventListener('click', this.clickOutside);
			if(onClose){
				onClose();
			}
		}
		this.setState({open})
	}

	componentDidUpdate = (prevProps, prevState) => {
		if (this.props.controlled){
			const {open = this.state.open} = this.props;
			if (this.state.open !== open){
				this.toggleMenu(open);
			}
		}
	}

	componentDidMount(){
		const {toggleMenu} = this;
		toggleMenu(this.props.open);
	}

	clickOutside = () => {
		if (!this.props.keepOpen){
			setTimeout(() => {
				if (this.clickedMenu){
					this.clickedMenu = false;
				}
				else {
					this.toggleMenu(false);
				}
			}, 5)
		}
	}

	onChange = retval => {
		const {onChange, keepOpen} = this.props;
		if (!keepOpen){
			this.toggleMenu(false);
		}
		return onChange ? onChange(retval) : null;
	}

	buildButton = () => {
		const {props, state, toggleMenu} = this;
		const {button} = props;
		const {open} = state;
		return (<div ref={this.openButton} className="svz-dropdown-button" onClick={() => this.props.controlled ? null : toggleMenu(!open) }>{button}</div>)
	}

	buildMenu = () => {
		const {onChange} = this;
		const {content, reverse} = this.props;
		const elements = [];
		for (const i in content){
			const elem = <div 
				key= {"svz-dropdown-list-elem-"+this.id +i} 
				onClick={() => onChange(React.isValidElement(content[i]) ? i : content[i])}
				className={'svz-dropdown-list-elem'}
			>
				{content[i]}
			</div>
			reverse ? elements.splice(0, 0, elem) : elements.push(elem);
		}
		return elements;
	}

	menuClass = () => {
		const {open} = this.state;
		const {menuClass, drop = 'down', orientation} = this.props;
		const {pop = drop} = this.props;
		return filterJoin(["svz-dropdown-menu", 'drop-' + drop, 'pop-' + pop, ['orient-' + orientation, orientation], ['active', open], menuClass])
	}

	render(){
		const {buildButton, buildMenu, popStyling} = this;
		const {id, className, keepOpen} = this.props;
		const {open} = this.state;
		const menuStyle = popStyling();
		return (
			<div id={id} className={filterJoin(["svz-dropdown-container", className, ['active', open]])}>
				<div className="svz-dropdown-sub-container" >
					{buildButton()}
					<div 
						ref={this.containerDiv} 
						style={menuStyle} 
						className={this.menuClass()}
						onClick = {() => this.clickedMenu = keepOpen ? true : false} 
					>
						<div 
							className={'menu-content'}
							ref={this.contentDiv} 
						>
							{buildMenu()}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Dropdown.propTypes={
	onChange: PropTypes.func,
	options: PropTypes.array,
	orientation: PropTypes.string,
	onClose: PropTypes.func,
	onOpen: PropTypes.func,
	pop: PropTypes.string,
	drop: PropTypes.string,
	fadeIn: PropTypes.bool,
	slideIn: PropTypes.bool,
}