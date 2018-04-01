import React, { Component } from 'react';

const keyName = (label) => {
  let key;
  if(label.props){
    if (label.props.children){
      if (typeof label.props.children === 'string'){
        return label.props.children;
      }
      for(let i of label.props.children){
        key = this.keyName(i);
        if (key !== 'dropElem')
          return key;
      }
    }
  }
  return 'dropElem';
}

const listStyle = (dropDirection, popDirection) => {
  let all = {position: 'absolute', display: 'flex'}
  switch (popDirection || dropDirection){
    case 'right':
    case 'left':
    case 'rightUp':
    case 'leftUp':
      all.flexDirection = 'row';
      break;
    case 'down':
    case 'downLeft':
    case 'upLeft':
    case 'up':
    default:
      all.flexDirection = 'column'
  }
  switch(dropDirection){
    case 'up':
      all.bottom = '100%'
      switch(popDirection){
        case 'left':
          all.right=0;
          return all;
        case 'right':
          all.left=0;
          return all;
        case 'up':
        default:
          return all;
      }
    case 'left':
      all.right='100%';
      switch(popDirection){
        case 'up':
          all.bottom = 0;
          return all;
        default:
          all.top=0;
          return all;
      }
    case 'right':
      all.left='100%'
      switch(popDirection){
        case 'up':
          all.bottom=0;
          return all;
        default:
          all.top= 0;
          return all;
      }
    case 'downLeft':
      all.right=0;
      return all;
    case 'upLeft':
      all.right=0;
      all.bottom='100%';
      return all;
    case 'rightUp':
      all.left='100%';
      all.bottom=0;
      return all;
    case 'leftUp':
      all.right='100%';
      all.bottom=0;
      return all;
    case 'down':
    default:
      switch(popDirection){
        case 'left':
          all.right= 0;
          return all;
        case 'right':
          all.left= 0;
          return all;
        case 'down':
        default:
          return all
      }
  }
}

export default class Dropdown extends Component {

  constructor(props) {
    super(props);
    const {reverseOrder} = props;
    const listVisible = typeof props.listVisible === 'undefined' ? false : props.listVisible;
    let {entries, buttonId}=props;
    if (reverseOrder) {
      entries.reverse();
    }
    const keyProp = keyName(props.label) + Math.floor(Math.random()*1000000);
    buttonId = (buttonId || 'svzDropButton' + Math.floor(Math.random()*1000000));
    const lastVisible=listVisible;
    const isOpen=listVisible;
    const {dropDirection, popDirection, delay} = props;
    const popStyle = listStyle(dropDirection, popDirection);
    this.state ={
      popDirection,
      dropDirection,
      lastVisible,
      listVisible,
      heightOf: 0,
      entries,
      keyProp,
      buttonId,
      popStyle,
      isOpen,
      listClickable: true
    }
    if (!props.keepOpen) window.addEventListener('click', this.onClickClose.bind(this));
  }

  componentWillUpdate() {
    //record if menu was open or closed for comparison after component update
    this.lastVisible = this.state.listVisible;
  }

  componentWillReceiveProps(nextProps){
    const {dropDirection, popDirection} = nextProps;
    const popStyle = listStyle(dropDirection, popDirection);
    if (this.state.popDirection != popDirection || this.state.dropDirection != dropDirection){
      this.setState({popStyle, popDirection, dropDirection});
    }
  }

  componentDidUpdate() {
    //Check if update is because list opened or closed.
    if (this.lastVisible != this.state.listVisible){
      //Checks if component has onToggle, onOpen, or OnClose functions and runs them.
      if (this.props.onToggle) {
        this.props.onToggle();
      }
      if (this.props.onOpen && this.state.listVisible) {
        this.props.onOpen();
      }
      if (this.props.onClose && this.state.listVisible) {
        this.props.onClose();
      }
    }
  }

  onClickClose = (event) => {
    //check if list is currently open
    if(this.state.listVisible){
      const label = document.getElementById(this.state.buttonId);
      let currentTarg = event.target;
      //check if target of click is within the activating button to prevent closing if this is activating button
      while (currentTarg){
        if (currentTarg === label){
          return;
        }
        currentTarg = currentTarg.parentNode;
      }
    }
    this.closeMenu();
  }

  closeMenu = () => {
    //if there is a delay, perform extra functions to check if the delay is currently active 
    if (this.props.delay) {
      //restart the delay if the delay is active.
      if (this.delayer) {
        clearTimeout(this.delayer);
      }
      //unless specified, the list cannot be clicked during the delay period
      if (!this.props.clickableInDelay) {
        this.setState({listVisible: false, listClickable: false});
      }
      this.delayer = setTimeout(() => this.setState({isOpen: false, listClickable: true}), this.props.delay);
    }
    else
      this.setState({listVisible: false});
  }

  renderMenu = () => {
    const {listItemStyle, entries} = this.props;
    const {keyProp} = this.state;
    return entries.map((entry, index) => {
      //if entry is constructed with an id variable, use that
      if (entry.id || entry.className) {
        return (
          <div 
            key={keyProp.concat(index)} 
            style={listItemStyle} 
            id={entry.id} 
            className={entry.className ? entry.className : "listEntry"} 
            onClick ={() => {
                if (this.props.onSelect){
                  this.props.onSelect(entry.children)
                }
              }
            }
          >
            {entry.children}
          </div>
        );
      }
      else {
        //if entry is constructed without an id variable or class, assume use as a basic component
        return (<div 
          key={keyProp.concat(index)} 
          style={listItemStyle} 
          className="listEntry" 
          onClick={() => {
            if (this.props.onSelect)
              this.props.onSelect(entry)
          }}
        >
          {entry}
        </div>);
      }
    });
  }

  buttonClick = () => {
    //if the delay is still going, restart it
    if (this.delayer) {
      clearTimeout(this.delayer);
    }
    // the list's state will be set to not visible, making it unclickable. It will be visually there until the delay completes
    this.setState({listVisible: !this.state.listVisible});
    // if a delay is set, perform the delay before completely hiding the list.
    if (this.props.delay) {
      this.state.listVisible ? this.closeMenu() : this.setState({isOpen: true});
    }
  }

  render() {
    const {state, props, renderMenu, onToggle, buttonClick} = this;
    const {buttonStyle, menuStyle, style, className, id, menuClass, menuId, delay} = props;
    const {popStyle, keyProp, buttonId, listClickable, listVisible, isOpen} = state;
    return (
      <div style = {{position: 'relative', display: 'inline-block', ...style}} className={className} id={id}>
        <div id={buttonId} style = {{cursor: 'pointer', ...buttonStyle}} onClick={() => buttonClick()}>{this.props.label}</div>
        <div style = {{pointerEvents: listClickable ? 'auto' : 'none'}} hidden={typeof delay != 'undefined' ? !isOpen : !listVisible}>
          <div className={menuClass} id={menuId} style={{...popStyle, ...menuStyle}}>
            {renderMenu()}
          </div>
        </div>
      </div>
    );
  }
}