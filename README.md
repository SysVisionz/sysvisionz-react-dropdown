# sysvisionz-react-dropdown

This module allows you to utilize a simple, highly customizable dropdown menu that can be used in pretty much any way you see fit; a link menu, a traditional selector, however. It allows you to dictate both the direction the menu initially "pops" from the origin point, as well as the direction it "drops" from that original point.

## Getting Started

All you have to do is
```
import Dropdown from 'sysvisionz-react-dropdown';
```
and then implement it by including that component within your code, via
```
<Dropdown
	{options}
/>
```

### Necessary Variables

#### label
**accepted variables:** any string or JSX element  
**behavior:** dictates the children of the main menu button.  

#### entries

**accepted variables:** array of strings or JSX elements  
**behavior:** dictates the children of the entries in the dropdown menu.  

### Optional Variables

#### keepOpen
**accepted variables:** boolean  
**behavior:** Defaults to false. Dictates if dropdown menu will stay open when clicking outside it. Menu can still be closed by clicking on the main menu button

#### onSelect
**accepted variables:** any function  
**behavior:** Function performed when a dropdown menu item is clicked.

#### reverseOrder
**accepted variables:** boolean
**behavior:** Defaults to false. Reverses order in which the menu items appear.

#### popDirection

**accepted variables:** 'up', 'down', 'left', 'right'  
**behavior:** Defaults to 'down' variable if not specified. This dictates the direction that your dropdown menu pops out of the main menu button.


#### dropDirection
**accepted variables:** 'up', 'down', 'left', 'right'  
*cannot be opposite of popDirection.*  
**behavior:** Defaults to popDirection variable if not specified. This dictates the direction that your dropdown menu drops from the inital popped out element.


#### listVisible

**accepted variables:** boolean  
**behavior:** Defaults to false. Dictates if dropdown menu is initially expanded.

#### buttonStyle
**accepted variables:** JSX styling  
**behavior:** dictates styling of the dropdown main menu button

#### menuStyle
**accepted variables:** JSX styling  
**behavior:** dictates styling of the dropdown menu

#### listItemStyle
**accepted variables:** JSX styling  
**behavior:** dictates styling of the individual dropdown elements

### Prerequisites

The only prerequisite for the use of this is that you have React installed.

## Author

* **Colin Brennan** - *full project* - [SysVisionz](https://github.com/SysVisionz, https://www.npmjs.com/~sysvisionz)

## Version History
1.0 -   
initial release  
1.1 -   
implemented ability to use any JSX element as main menu button  
implemented keepOpen option
