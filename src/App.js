import React, { Component } from 'react';

export default class Dropdown extends Component {

  constructor(props) {
    super();
    const {listItemStyle, reverseOrder, listVisible} = props;
    let {entries}=props;
    const {keyName} = this;
    entries = reverseOrder ?  this.reverseArray(entries) : entries;
    const keyProp = keyName(props.label);
    this.state ={
      listVisible : (listVisible || false),
      heightOf: 0,
      listItemStyle,
      entries,
      keyProp,
    }
    !props.keepOpen ? window.addEventListener('click', this.onClickClose.bind(this)) : void 0;
  }

  reverseArray = (array) => {
    let newArray=[];
    for( const entry in array ){
      newArray.splice(0,0,array[entry]);
    }
    return newArray;
  }

  componentDidMount() {
    const {props, listStyle} = this
    const {popDirection, dropDirection} = props;
    const popStyle = listStyle(popDirection, dropDirection);
    this.setState({popStyle});
  }

  onClickClose = (event) => {
    if(this.state.listVisible){
        const label = document.getElementById('label');
        let currentTarg = event.target;
        while (currentTarg){
          if (currentTarg === label){
            return;
          }
          currentTarg = currentTarg.parentNode;
        }
        this.setState({listVisible: false});
    }
  }

  listStyle = (popDirection, dropDirection) => {
    const all = {position: 'absolute'}
    switch(popDirection){
      case 'up':
        switch(dropDirection){
          case 'left':
            return {
              ...all,
              display: 'flex',
              flexDirection: 'row-reverse',
              bottom: '100%',
              right: '0'
            }
          case 'right':
            return {
              ...all, 
              display: 'flex',
              flexDirection: 'row',
              bottom: '100%',
              left: '0'
            }
          case 'up':
          default:
            return {
              ...all, 
              bottom: '100%', 
              display: 'flex', 
              flexDirection: 'column-reverse' 
            };
        }
      case 'left':
        switch(dropDirection){
          case 'up':
            return {
              ...all,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column-reverse',
              left:'-100%'
            }
          case 'down':
            return {
              ...all,
              top: 0,
              display: 'flex',
              flexDirection: 'column',
              left: '-100%'
            }
          case 'left':
          default:
            return {
              ...all,
              right: '100%',
              top: 0,
              display: 'flex',
              flexDirection: 'row-reverse'
            }
        }
      case 'right':
        switch(dropDirection){
          case 'up':
            return {
              ...all,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column-reverse',
              right: '-100%'
            }
          case 'down':
            return {
              ...all,
              top: 0,
              display: 'flex',
              flexDirection: 'column',
              right: '-100%'
            }
          case 'right':
          default:
            return {
              ...all,
              top: 0,
              display: 'flex',
              flexDirection: 'row',
              left: '100%'
            }
        }
      case 'down':
      default:
        switch(dropDirection){
          case 'left':
            return {
              ...all,
              right: 0,
              display: 'flex',
              flexDirection: 'row-reverse'
            }
          case 'right':
            return {
              ...all, 
              display: 'flex',
              left: 0,
              flexDirection: 'row'
            }
          case 'down':
          default:
            return {
              ...all,
              display: 'flex',
              flexDirection: 'column'
            }
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

  render() {
    const {state, props} = this;
    const {buttonStyle, menuStyle, listItemStyle } = props;
    const {popStyle, listVisible, keyProp, entries} = state;
    return (
      <div style = {{position: 'relative', display: 'inline-block'}}>
        <div id='label' style = {{cursor: 'pointer', ...buttonStyle}} onClick={() => this.setState({listVisible: !listVisible})}>{this.props.label}</div>
        <div hidden={!listVisible} id={keyProp.concat('menu')}>
          <div style={{...popStyle, ...menuStyle}}>
            {entries.map((entry, index) => <div key={keyProp.concat(index)} style={listItemStyle} className="listEntry" onClick={() => this.props.onSelect(entry)}>{entry}</div>)}
          </div>
        </div>
      </div>
    );
  }
}