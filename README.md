# sysvisionz-react-dropdown

This module allows you to utilize a simple, highly customizable dropdown menu that can be used in pretty much any way you see fit; a link menu, a traditional selector, however. It allows you to dictate both the direction the menu initially "pops" from the origin point, as well as the direction it "drops" from that original point.

## Getting Started

### Installation
To install, in terminal type

```
	npm i --save-dev sysvisionz-react-dropdown
```

then, in your react project,

```
import Dropdown from 'sysvisionz-react-dropdown';
```  

and finally, implement it by including that component within your code:

```
<Dropdown
	{options}
/>
```

### Necessary Variables

#### label
**accepted variables:** any string or JSX element  
**behavior:** dictates the children of the activating button.  

#### entries

**accepted variables:** array of strings, JSX elements, or objects with ```id``` and ```children``` properties.  
**behavior:** dictates the children of the entries in the dropdown menu.  If split into ```id``` and ```children```, the ```id``` property is applied as the id of the div containing this array element, and the ```children``` property dictates the children of that element.

### Optional Variables

#### dropDirection
**accepted variables:** 'up', 'down', 'left', 'right'  
**behavior:** Defaults to 'down' variable if not specified. This dictates the direction that your dropdown menu drops out of the activating button. downLeft and upLeft are special variants; they render a normal dropDirection, but orient the menu's edge to the opposite of the basic version (to the right edge for downLeft and upLeft, and to the bottom edge for rightUp and leftUp) to the activating button instead of the left edge. Note that, due to their nature, they make the popDirection variable unnecessary by definition.

#### popDirection
**accepted variables:** 'up', 'down', 'left', 'right'  
*cannot be opposite of dropDirection.*  
**behavior:** Defaults to dropDirection variable if not specified. This dictates the direction that your dropdown menu pops outwards from the inital dropped out element.

#### orientation
**accepted variables:** 'top', 'bottom', 'left', 'right', 'center'  
*top, bottom, left, and right can only be applied when **popDirection** prop is not used. center may always be used*  
*note that top and bottom can only be used with dropDirection of left or right, and left or right with dropDirection up or down*   
**behavior:** controls where the dropdown menu is oriented in relation to its supplied dropDirection. orientation center will make a menu dropping downwards appear centered beneath the activating button, where orientation left will make the right edge of the menu align with the right edge of the activating button.

#### controlled
**accepted variables:** boolean  
**behavior:** dictates whether the menu is opened and closed by an outside variable (which is supplied through the isOpen variable)

#### keepOpen
**accepted variables:** boolean  
**behavior:** Defaults to false, unless **controlled** is true, then it defaults to true. Dictates if dropdown menu will stay open when clicking outside it or on the entries in the menu. Menu can still be closed by clicking on the activating button
**note:** if you do set this to false while controlled is true, it is highly recommended that you use the onToggle function to reset your isOpen variable accordingly!

#### onSelect
**accepted variables:** function  
**behavior:** Function performed when a dropdown menu item is clicked using the entry clicked.

#### onToggle
**accepted variables:** function  
**behavior:** function performed when menu is opened or closed. Supplies boolean for whether or not the menu is open as the first variable.

#### onOpen
**accepted variables:** function  
**behavior:** function performed when menu is opened.

#### onClose
**accepted variables:** function  
**behavior:** function performed when menu is closed.

#### delay
**accepted variables:** number  
**behavior:** delay before closing the menu.  

#### clickableInDelay
**accepted variables:** boolean  
**behavior:** if menu is clickable during the delay when closing.

#### id
**accepted variables:** string  
**behavior:** dictates the id for the overall element.

#### className
**accepted variables:** string  
**behavior:** dictates the className for the overall element.

#### style
**accepted variables:** string  
**behavior:** dictates the style for the overall element.

#### buttonId
**accepted variables:** string  
**behavior:** dictates the id property for the activating button.

#### buttonClass
**accepted variables:** string  
**behavior:** dictates the className for the activating button.

#### buttonStyle
**accepted variables:** string  
**behavior:** dictates the style for the activating button.

#### menuId
**accepted variables:** string  
**behavior:** dictates the id for the dropdown menu element.

#### menuClass
**accepted variables:** string  
**behavior:** dictates the className for the dropdown menu element.

#### menuStyle
**accepted variables:** string  
**behavior:** dictates the style for the dropdown menu element.

#### listClass
**accepted variables:** string  
**behavior:** dictates the className for all individual items in the dropdown menu.

#### listStyle
**accepted variables:** JSX styling  
**behavior:** dictates styling for all individual items in the dropdown menu.


### Prerequisites

The only prerequisite for the use of this is that you have React installed.

## Author

* **Colin Brennan** - *full project* - [SysVisionz](https://github.com/SysVisionz, https://www.npmjs.com/~sysvisionz)

## Version History
1.0 -   
initial release  
1.1 -  
implemented ability to use any JSX element as activating button  
implemented keepOpen prop.  
1.2 -  
resolved location issues with package.json  
reversed dropDirection and popDirection for clarity.  
cleaner implementation of several code sections.  
1.3 -  
allowed for multiple dropdowns to be generated.  
1.4 -  
added style prop.  
1.5 -  
added buttonId and menuId properties  
added ability to split array elements into ```id``` and ```children``` properties.  
1.6 -  
added onToggle, onOpen, and onClose properties.  
1.7 -  
added delay and clickableInDelay properties.  
1.8 -  
significant refactor for reliability, removal of retrieved redundant boolean on onToggle.  
1.9 -  
implementation of leftUp, rightUp, upLeft and downLeft dropDirection options.

2.0 -
Complete refactor and bugfixes
addition of orientation
modification of listVisible to isOpen for ease of use
significant additions to user control of elements.
addition of controlled option.