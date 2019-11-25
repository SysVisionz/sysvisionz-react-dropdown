# sysvisionz-react-dropdown

This module allows you to utilize a simple, highly customizable dropdown menu that can be used in pretty much any way you see fit; a link menu, a traditional selector, however. It allows you to dictate both the direction the menu initially "drops" from the original button, as well as the direction it "pops" outward from that original point, give each part styles or classes, put functions triggered by an item being selected, as well as the menu opening, closing, or every time it is toggled open or closed, control whether the menu is open through a value supplied from elsewhere, dictate if clicking outside the menu will close it or keep it open... or none of these things. It's a handy dandy toolbox of infinite possibilities and ridiculous simplicity!

## Getting Started

<details><summary><strong>Installation</strong></summary>
To install, in terminal type

```
	npm i --save sysvisionz-react-dropdown
```

then, in your react project,

```
import Dropdown from 'sysvisionz-react-dropdown';
```  

and finally, implement it by including that component within your code:

```
<Dropdown {options}>
    {children}
</Dropdown>
```
</details>

<details><summary>Required Props</summary>

<details><summary>children</summary>

**behavior:** Content of the activating button.</details>

<details><summary>content</summary>

**accepted types:** array of strings or JSX elements  
**behavior:** dictates the children of the entries in the dropdown menu.
</details></details>

<details><summary>Optional Props</summary>

<details><summary><strong>drop</strong></summary>
**accepted types:** 'up', 'down', 'left', 'right'  
**default:** 'down'  
**behavior:** This dictates the direction that your dropdown menu drops out of the activating button. downLeft and upLeft are special variants; they render a normal drop, but orient the menu's edge to the opposite of the basic version (to the right edge for downLeft and upLeft, and to the bottom edge for rightUp and leftUp) to the activating button instead of the left edge. Note that, due to their nature, they make the pop prop unnecessary by definition.</details>

<details><summary><strong>pop</strong></summary>
**accepted types:** 'up', 'down', 'left', 'right'  
**default:** **drop**  
**note:** *cannot be opposite of drop.*  
**behavior:** This dictates the direction that your dropdown menu pops outwards from the inital dropped out element.</details>

<details><summary><strong>orientation</strong></summary>
**accepted types:** 'top', 'bottom', 'left', 'right', 'center'  
**behavior:** controls the dropdown menu relative to the activating button. 'center' will make a menu dropping downwards appear centered beneath the activating button, 'left' will make the right edge of the menu align with the right edge of the activating button, 'top' aligns the bottom edge with the bottom edge of the activating button, and so on.</details>

<details><summary><strong>open</strong></summary>
**type:** Boolean  
**default:** **false**  
**note:** *need not be set unless **controlled** is **true**.*
**behavior:** Whether the dropdown is open or not.</details>

<details><summary><strong>controlled</strong></summary>
**type:** Boolean  
**behavior:** dictates whether the menu is opened and closed by an outside variable (which is supplied through the **open** prop).</details>

<details><summary><strong>keepOpen</strong></summary>
**type:** boolean  
**default:** **controlled**  
**behavior:** Dictates if dropdown menu will stay open when clicking outside it or on the entries in the menu. Menu can still be closed by clicking on the activating button
**note:** if you do set this to false while controlled is true, it is highly recommended that you use the onToggle function to reset **open**!</details>

<details><summary><strong>onToggle</strong></summary>
**type:** function  
**supplies:** Boolean of current open state of menu.  
**behavior:** function performed when menu is opened or closed.</details>

<details><summary><strong>onOpen</strong></summary>
**type:** function  
**behavior:** function performed when menu is opened.</details>

<details><summary><strong>onClose</strong></summary>
**accepted types:** function  
**behavior:** function performed when menu is closed.</details>

<details><summary><strong>slideIn</strong></summary>
**accepted types:** Boolean  
**behavior:** The menu does a smooth slide in animation.</details>

<details><summary><strong>fadeIn</strong></summary>
**accepted types:** Boolean  
**behavior:** The menu does a smooth fade in animation.</details>

<details><summary><strong>transition</strong></summary>
**accepted types:** Number  
**behavior:** Delays menu close for this many milliseconds, for the purposes of manually applied css transitions.</details>

<details><summary><strong>className</strong></summary>
**type:** String  
**behavior:** dictates the className for the overall element. Adds to prefix of **svz-dropdown-container** and is followed by **active** when the menu element is open.</details>

<details><summary><strong>id</strong></summary>
**type:** String  
**behavior:** dictates the id for the dropdown containing div</details>
</details>

## Prerequisites

As this is a React element, it doesn't run outside of a React environment.

## Author

* **Colin Brennan** - *full project* - [SysVisionz Github](https://github.com/SysVisionz), [SysVisionz NPM Modules](https://www.npmjs.com/~sysvisionz)

## Version History
1.0 -   
initial release  
1.1 -  
implemented ability to use any JSX element as activating button  
implemented keepOpen prop.  
1.2 -  
resolved location issues with package.json  
reversed drop and pop for clarity.  
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
implementation of leftUp, rightUp, upLeft and downLeft drop options.

2.0 -  
Complete refactor and bugfixes  
addition of orientation  
modification of listVisible to isOpen for ease of use  
significant additions to user control of elements.  
addition of controlled option.  
2.1 -  
Huge bugfix  
introduction of open and closed automatic class name.  
now properly allows for animations  

3.0 -  
Complete refactor, removal of many extraneous prop, actual complete bugfixes.  
3.1 -  
Controlled prop reintroduced properly.  
3.2 -  
Bugfix on controlled and keepOpen props  

4.0 -  
Removal of a number of extraneous prop: **onChange**, **button**, **menuClass**