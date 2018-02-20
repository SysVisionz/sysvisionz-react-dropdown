import React, { Component } from 'react';

export default class Dropdown extends Component {

  constructor(props) {
    super(props);
    const {reverseOrder, listVisible} = props;
    let {entries, buttonId}=props;
    const {keyName} = this;
    entries = reverseOrder ?  this.reverseArray(entries) : entries;
    const keyProp = keyName(props.label) + Math.floor(Math.random()*1000000);
    buttonId = (buttonId || 'svzDropButton' + Math.floor(Math.random()*1000000));
    let lastVisible;
    const {dropDirection, popDirection, delay} = props;
    const popStyle = this.listStyle(dropDirection, popDirection);
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
      isOpen: delay ? false : undefined,
      listClickable: true
    }
    !props.keepOpen ? window.addEventListener('click', this.onClickClose.bind(this)) : void 0;
  }

  componentWillUpdate() {
    this.state.lastVisible = this.state.listVisible;
  }

  componentWillReceiveProps(nextProps){
    const {listStyle} = this
    const {dropDirection, popDirection} = nextProps;
    const popStyle = listStyle(dropDirection, popDirection);
    this.state.popDirection != popDirection || this.state.dropDirection != dropDirection 
    ? this.setState({popStyle, popDirection, dropDirection}) 
    : void 0;
  }

  componentDidUpdate() {
    if (this.state.lastVisible != this.state.listVisible){
      this.props.onToggle ? this.props.onToggle(this.state.listVisible): void 0;
      this.props.onOpen 
      ? this.state.listVisible ? this.props.onOpen() : void 0 
      : void 0;
      this.props.onClose 
      ? !this.state.listVisible ? this.props.onClose() : void 0 
      : void 0;
    }
  }

  reverseArray = (array) => {
    let newArray=[];
    for( const entry in array ){
      newArray.splice(0,0,array[entry]);
    }
    return newArray;
  }

  onClickClose = (event) => {
    if(this.state.listVisible){
      const label = document.getElementById(this.state.buttonId);
      let currentTarg = event.target;
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
    if (this.props.delay) {
      this.delayer ? clearTimeout(this.delayer): void 0;
      !this.props.clickableInDelay ? this.setState({listVisible: false, listClickable: false}) : void 0;
      this.delayer = setTimeout(() => this.setState({isOpen: false, listClickable: true}), this.props.delay);
    }
    else
      this.setState({listVisible: false});
  }

  listStyle = (dropDirection, popDirection) => {
    let all = {position: 'absolute', display: 'flex'}
    switch (popDirection || dropDirection){
      case 'right':
      case 'left':
        all.flexDirection = 'row';
        break;
      case 'down':
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

  keyName = (label) => {
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

  renderMenu = () => {
    const {listItemStyle, entries} = this.props;
    const {keyProp} = this.state;
    return entries.map((entry, index) => {
      if (entry.id)
        return (<div key={keyProp.concat(index)} style={listItemStyle} id={entry.id} className="listEntry" onClick ={() => this.props.onSelect ? this.props.onSelect(entry.children) : void 0}>{entry.children}</div>);
      else 
        return (<div key={keyProp.concat(index)} style={listItemStyle} className="listEntry" onClick={() => this.props.onSelect ? this.props.onSelect(entry) : void 0}>{entry}</div>);
    });
  }

  buttonClick = () => {
    this.delayer ? clearTimeout(this.delayer): void 0;
    this.setState({listVisible: !this.state.listVisible});
    this.props.delay
      ? this.state.listVisible ? this.closeMenu() : this.setState({isOpen: true})
      : void 0;
  }

  render() {
    const {state, props, renderMenu, onToggle, buttonClick} = this;
    const {buttonStyle, menuStyle, style, className, id, menuClass, menuId} = props;
    const {popStyle, keyProp, buttonId, listClickable, listVisible, isOpen} = state;
    return (
      <div style = {{position: 'relative', display: 'inline-block', ...style}} className={className} id={id}>
        <div id={buttonId} style = {{cursor: 'pointer', ...buttonStyle}} onClick={() => buttonClick()}>{this.props.label}</div>
        <div style = {{pointerEvents: listClickable ? 'auto' : 'none'}} hidden={typeof isOpen != 'undefined' ? !isOpen : !listVisible}>
          <div className={menuClass} id={menuId} style={{...popStyle, ...menuStyle}}>
            {renderMenu()}
          </div>
        </div>
      </div>
    );
  }
}