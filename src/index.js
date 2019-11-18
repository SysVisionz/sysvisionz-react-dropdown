import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {filterJoin} from './svz-utilities';
import './scss/Dropdown.scss';

class Dropdown extends Component {

	constructor(){
		super();
		this.contentDiv = React.createRef();
		this.state = {open: false, transitioning: false}
	}
	
	popStyling = () => {
		const {open} = this.state;
		const {transition = (this.props.slideIn ? 400 : 0), fadeIn, slideIn, drop, pop} = this.props;
		const horizontal = {
			drop: drop === 'left' || drop === 'right',
			pop: pop === 'left' || pop ==='right'
		}
		let style = {
			width: (open || !horizontal.pop) && this.contentDiv.current ? this.contentDiv.current.scrollWidth : 0,
			height: (open || horizontal.pop) && this.contentDiv.current ? this.contentDiv.current.scrollHeight: 0,
		}
		return style;
	}

	toggleMenu = open => {
		const {onToggle, onOpen, onClose, transition = (this.props.slideIn ? 400 : 0) } = this.props;
		if (onToggle){
			onToggle(open);
		}
		if (open){
			document.addEventListener('click', this.clickOutside)
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
		this.setState({open, transitioning: true})
		clearTimeout(this.transitionTimer);
		this.transitionTimer = setTimeout(() => this.setState({transitioning: false}), transition)
	}

	componentDidUpdate = (prevProps, prevState) => {
		const {open = this.state.open} = this.props;
		if (this.state.open !== open){
			this.toggleMenu(open);
		}
	}

	componentDidMount(){
		const {toggleMenu} = this;
		toggleMenu(this.props.open);
	}

	clickOutside = () => {
		setTimeout(() => {
			console.log(this.clickedMenu)
			if (this.clickedMenu){
				this.clickedMenu = false;
			}
			else {
				this.toggleMenu(false);
			}
		}, 10)
	}

	onChange = retval => {
		const {onChange, keepOpen} = this.props;
		if (!keepOpen){
			this.toggleMenu(false);
		}
		return onChange ? onChange(retval) : null;
	}

	buildButton = () => {
		const {children, button, controlled} = this.props;
		const {open} = this.state;
		return (<div className="svz-dropdown-button" onClick={() => !controlled ? this.toggleMenu(!open) : null}>{children || button}</div>)
	}

	menuClass = () => {
		const {open, transitioning} = this.state;
		const {menuClass, drop = 'down', orientation, slideIn, fadeIn, pop = drop} = this.props;
		return filterJoin(["svz-dropdown-menu", 'drop-' + drop, 'pop-' + pop, ['orient-' + orientation, orientation], ['active', open], ['transitioning', transitioning], ['slide-in', slideIn], ['fade-in', fadeIn]])
	}

	render(){
		const {buildButton, buildMenu, popStyling, toggleMenu} = this;
		const {keepOpen, id, className, content, pop = this.props.drop} = this.props;
		const {open} = this.state;
		const menuStyle = popStyling();
		return (
			<div id={id} className={filterJoin(["svz-dropdown-container", className, ['active', open]])}>
				<div className="svz-dropdown-sub-container" >
					{buildButton()}
					<div 
						style={menuStyle} 
						className={this.menuClass()}
						onClick = {() => this.clickedMenu = keepOpen} 
					>
						<div 
							className={filterJoin(['menu-content', ['active', open]])}
							ref={this.contentDiv} 
						>
							{content.map( (elem, index) => <div 
									key= {`svz-dropdown-list-elem-${(id  || '') + index}`} 
									onClick={() => !keepOpen ? toggleMenu(false) : this.clickedMenu = keepOpen}
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

export default Dropdown