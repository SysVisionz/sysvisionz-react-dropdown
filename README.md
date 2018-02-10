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

#### keepOpen
**accepted variables:** boolean  
**behavior:** Defaults to false. Dictates if dropdown menu will stay open when clicking outside it. Menu can still be closed by clicking on the activating button

#### onSelect
**accepted variables:** function  
**behavior:** Function performed when a dropdown menu item is clicked using the entry clicked.

#### buttonId
**accepted variables:** string
**behavior:** dictates the id property for the activating button in the menu. This is automatically generated if left blank.

#### menuId
**accepted variables:** string
**behavior:** dictates the id for the dropdown menu element.

#### reverseOrder
**accepted variables:** boolean
**behavior:** Defaults to false. Reverses order in which the menu items appear.

#### dropDirection

**accepted variables:** 'up', 'down', 'left', 'right'  
**behavior:** Defaults to 'down' variable if not specified. This dictates the direction that your dropdown menu drops out of the activating button.


#### popDirection
**accepted variables:** 'up', 'down', 'left', 'right'  
*cannot be opposite of popDirection.*  
**behavior:** Defaults to popDirection variable if not specified. This dictates the direction that your dropdown menu pops outwards from the inital dropped out element.


#### listVisible

**accepted variables:** boolean  
**behavior:** Defaults to false. Dictates if dropdown menu is initially expanded.

### style
**accepted variables:** JSX styling. **DO NOT INCLUDE position STYLING**  
**behavior:** dictates styling of the overall dropdown

#### buttonStyle
**accepted variables:** JSX styling  
**behavior:** dictates styling of the dropdown activating button

#### menuStyle
**accepted variables:** JSX styling  **DO NOT INCLUDE position STYLING**
**behavior:** dictates styling of the dropdown menu

#### listItemStyle
**accepted variables:** JSX styling  
**behavior:** dictates styling of the individual dropdown elements

#### onToggle
**accepted variables:** function  
**behavior:** function performed when menu is opened or closed, using true if the menu is now open or false if it is now closed.

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