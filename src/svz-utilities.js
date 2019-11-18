export const callbacker = (elements, callback, length = 1, index = 0) => {
	elements = [...elements]
	while(elements.length > 0){
		const value = elements.splice(0, length);
		callback(value, index)
		index++;
	}
}

Object.filter = (object, test) => {
	for (const i in object){
		if (!test(object[i])){
			delete object[i];
		}
	}
}

Number.isPositive = (number) => {
	if (number > 0){
		return 1;
	}
	if (number < 0){
		return -1
	} 
	return 0;
}

Number.confine = (number, max, min) => {
	if(max !== null && number > max){
		return max;
	}
	if (min !== undefined && min !== null && number < min){
		return min;
	}
	return number;
}

export const filterJoin = (arr, joinVal = ' ') => {
	for (const i in arr){
		if(arr[i] && typeof arr[i] === 'object'){
			arr[i] = arr[i][1] ? arr[i][0] : null;
		}
	}
	return arr.filter(a => a).join(joinVal)
}


export const alterClass = (elem, className, remove) => {
	if(elem.classList.contains(className) && remove){
		elem.classList.remove(className);
	}
	else if (!elem.classList.contains(className) && !remove){
		elem.classList.add(className)
	}
}

Array.sameVal = (num, val) => new Array(num).fill(val)

Array.standardized = (array, index) => {
	for (let i = 1; i < array.length; i++){
		if (index){
			if (array[i][index] !== array[i-1][index]){
				return false;
			}
		}
		else if (array[i] !== array[i-1]){
			return false;
		}
	}
	return index 
		? array[0][index] === undefined ? null : array[0][index] 
		: array[0] === undefined ? null : array[0]
}

Number.calcAdditive = (number, maxVal) => {
	let i = 0;
	let calcTotal = 0;
	while (Math.abs(calcTotal) < Math.abs(number)) {
		i++;
		const addTo = maxVal && i > maxVal ? maxVal*Number.isPositive(number) : Number.isPositive(number)*i;
		calcTotal += addTo;
	}
	return i;
}

Object.sameVal = (keyArray, val) => {
	const retval = {};
	for (const i in keyArray){
		retval[keyArray[i]] = val;
	}
	return retval;
}

Array.sequential = (length, calculate, current = []) => {
	current.push(calculate(current.length-1));
	if (current.length === length){
		return current;
    }
	else {
		return Array.sequential(length, calculate, current)
    }
}

Array.sum = (arr) => arr.reduce((a, b) => a + b, 0);

Object.sequential = (arrKeys, calculate, current = {}) => {
	const i = Object.keys(current).length
	current[arrKeys[i]] = calculate(arrKeys[i])
	if (arrKeys.length === i){
		return current;
	}
	else {
		return Object.sequential(arrKeys, calculate, current)
	}
}

export class NumberMan {
	constructor(number, exact){
		this.number = number;
		this.exact = exact;
	} 

	//toPhone converts a number or string to a US phone number format.
	toPhone = (number = this.number) => "(" + (''+number).substr(0,3) + ") " + (''+number).substr(3,3) + "-" + (''+number).substr(6)

	//toDollars returns either the NumberMan's number or an inputted number to currency format
	toDollars = (number = this.number) => "$" + (number ? this.addZeroes(2, true, this.capDigits(number, 2)) : '0.00');

	//addZeroes adds zeroes as a prefix or as decimal places until the test evaluates as false.
	addZeroes = (digits, toEnd = true, number) => {
		const {trailingDigits, maxDigits, addZeroes, addZero} = this;
		//prevent exceeding maximum defined digits.
		const addMore = (toEnd ? trailingDigits(''+number || this.number) <= digits : (''+(number || this.number)).length <= digits) && !(toEnd && (trailingDigits(''+(number || this.number)) === maxDigits))
		//if the test function evaluates to true, add a decimal place if toEnd is true and we haven't reached the maximum decimal places specified, and add a prefix 0 if toEnd is false.
		if (addMore){
			if (number) {
				return addZeroes(digits, toEnd, addZero(toEnd, number));
			}
			else {
				this.number = addZeroes(digits, toEnd, addZero(toEnd, this.number))
			}
		} else {
			return number;
		}
	}

	set places (digits) {
		this.maxDigits = typeof digits === 'string' ? this.trailingDigits(digits) : digits;
		this.number = this.number;
	}

	sizeOf = (numberVal, trailing = true) => trailing ? (''+numberVal).includes('.') ? (''+numberVal).substring((''+numberVal).indexOf('.')+1).length : 0 : 0;

	addZero = (toEnd, number) => (!toEnd ? '0' : '') + number + (toEnd ? (''+number).includes('.') ? '0' : '.0' : '')

	capDigits = (number, digits = this.maxDigits) => Math.round(Number.parseFloat(number)*Math.pow(10,digits))/Math.pow(10,digits);

	exactPlaces = digits => {
		this.maxDigits = digits;
		if (this.trailingDigits() > digits){
			this.number = this.capDigits(this.number);
		}
		this.numberVal = this.addZeroes(digits)
	}

	set number (numberValue) {
		//ensure that the number's value does not exceed the maximum trailing digits set for this NumberMan.
		if (!numberValue){
			return false;
		}
		if (this.maxDigits && this.trailingDigits(numberValue) > this.maxDigits) {
			this.numberVal = ''+numberValue;
			this.exactPlaces(this.maxDigits)
		} else {
			this.numberVal = ''+numberValue;
			if (this.exact){
				this.exactPlaces(this.maxDigits)
			}
		}
	}

	get number(){
		return this.numberVal
	}


	// trailingDigits returns the number of decimal places
	trailingDigits = number => {
		if (number){
			return this.sizeOf(number);
		}
		return this.sizeOf(this.number);
	}

	// toDigits accepts a string to test against, an array of values to test against or a number of digits
	// and either adds zeroes as prefixes or zeroes as decimal places.
	toDigits = (digitsOrNumberArray, trailing = true) => {
		const {addZeroes, trailingDigits} = this;
		const newLength = (current, test) => {
			const digits = trailing ? trailingDigits(test) : test.length;
			return Math.max(digits, current);
		}
		let toLength = trailing ? trailingDigits() : this.number.length;
		if (typeof digitsOrNumberArray === 'object'){
			for (const i in digitsOrNumberArray){
				toLength = newLength(toLength, ''+digitsOrNumberArray[i])
			}
		}
		else if(typeof digitsOrNumberArray === 'string'){
			toLength =  newLength(toLength, digitsOrNumberArray);
		}
		else if(typeof digitsOrNumberArray === 'number'){
			toLength = Math.max(toLength, digitsOrNumberArray);
		}
		addZeroes(toLength, trailing);
		return this.number;
	}
}

 class Gradienter {
	constructor (colorsArr){
		this.colorMap = {};
		for (let i = 0; i < 16; i++){
			if (i < 10){
				this.colorMap[i] = Number.parseInt(i);
			}
			else {
				this.colorMap[String.fromCharCode(55+i)] = Number.parseInt(i);
			}
		}
		this.colors = colorsArr;
		this.mapColors = [];
		for (const i in this.colorMap){
			this.mapColors.push(i);
		}
	}
	
	colorFromArr = colorArr => {
		const {mapColors} = this;
		for ( const i in colorArr ) {
			colorArr[i] = colorArr === 0 ? '00' :'' + mapColors[Math.floor(colorArr[i]/16)] + mapColors[colorArr[i] % 16];
		}
		return '#' + colorArr.join('');
	}

	colorToArr = color => {
		color = color.toUpperCase();
		color = color.substr(1);
		const colors = Array(4);
		const {colorMap} = this;
		for (const i in color.split('')){
			const ch = color.charAt(i);
			if (color.length < 6){
				if (colors[i] === undefined){
					colors[i] = 0;
				}
				colors[i] += colorMap[ch] * 16 + colorMap[ch];
			}
			else{
				if (colors[Math.floor(i/2)] === undefined){
					colors[Math.floor(i/2)] = 0;
				}
				colors[Math.floor(i/2)] += i % 2 === 0 ? colorMap[ch] * 16 : colorMap[ch];
			}
		}
		if (colors[3] === undefined){
			colors[3] = 255;
		}
		return colors;
	}

	calcArc = (number1, number2, stages, invert) => {
		const placeHold = invert ? number1 : null;
		number1 = invert ? number2 : number1;
		number2 = invert ? placeHold : number2;
		const stageLocs = [number1];
		for (let i = 1; i < stages; i++){
			stageLocs[i] = number2 - Math.round((Math.cos(Math.PI*i/(stages*2)+(invert ? .5*Math.PI : 0))+(invert ? 1 : 0))/.5*(number2/2-number1/2)) ;
		}
		stageLocs.push(number2);
		if (invert){
			stageLocs.reverse();
		}
		return stageLocs
	}

	set colors (colorsArr) {
		const retval = [];
		for ( const i in colorsArr){
			retval[i] = (this.colorToArr(colorsArr[i]));
		}
		this.colorsArr = retval;
	}

	get colors () {
		const retval = this.colorsArr;
		for (const i in retval){
			retval[i] = this.colorFromArr([retval[i][0], retval[i][1], retval[i][2], retval[i][3]] )
		}
		return retval;
	}

	addColor = color => this.colorsArr.push(this.colorToArr(color))

	arcGradient = (complexity, type="linear-gradient", direction, invert) => {
		const colors = this.colorsArr;
		const newColors = [];
		const perStage = complexity/(colors.length-1);
		const retval = [];
		for (let i = 1; i < colors.length; i++){
			const arr = [];
			const first = colors[i-1];
			const second = colors[i];
			for (const index in first){
				arr.push(this.calcArc(first[index], second[index], perStage));
			}
			for (const index in arr[0]){
				newColors.push([arr[0][index], arr[1][index], arr[2][index], arr[3][index]]);
			}
		}
		for (const i in newColors){
			retval.push(this.colorFromArr([newColors[i][0], newColors[i][1], newColors[i][2], newColors[i][3]]));
		}
		return type + '( ' + (direction ? direction +', ' : '') + retval.join(', ') + ')'
	}
}

class CookieMan {

	static set (name, value, expiration) {
		if (name && value){
			let cookieString = name + '=' + value + ';';
			if (expiration){
				const date=new Date(expiration);
				cookieString += ' expires=' + date.toLocalString + ';';
			}
			cookieString += ' path=/;';
			document.cookie = cookieString;
		}
		else {
			return 'Requires name and value as (name, value)';
	    }
	}

    static get (name) {
		const cookieStrings = (decodeURIComponent(document.cookie).split(';'));
		name = name+'=';
		for ( let i in cookieStrings) {
			i = Number.parseInt(i);
			let curr = cookieStrings[i].trim();
			if (curr.indexOf(name) === 0){
				curr = curr.substring(name.length);
				return curr;
			}
		}
		return decodeURIComponent(document.cookie).split(';');
    }

    static delete(name, path) {
    	document.cookie= path ? name+'==; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=' + path + ';' : name+'=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    }

}

class ScreenMan {

	constructor(y = 0, x = 0){
		this.resetter = this.reset.bind(this);
		this.scrollX = false;
		this.offset={x, y}
		this.scrollCallbackDelay=10;
		this.resizeCallbackDelay=10;
		this.scrollTarget = {x: null, y: null};
		this.scrolling = {x: false, y: false};
	}

	onScrollTrigger = evt => {
		if (!this.inScrollDelay && this.callback){
			this.callback(evt, window.pageYOffset, window.pageXOffset);
			this.inScrollDelay=true;
			setTimeout(() => {
				this.inScrollDelay=false;
				this.callback(window.pageYOffset, window.pageXOffset);
			}, this.scrollCallbackDelay)
		}
	}

	endScroll = (all=true, isY = true) => {
		console.log("all: " + all, "isY: " + isY)
		if (isY && !all){
			clearTimeout(this.scrollYTimer);
			this.scrolling.y = false;
		}
		else if (all){
			this.scrolling.x = false;
			this.scrolling.y = false;
			clearTimeout(this.scrollXTimer);
			clearTimeout(this.scrollYTimer);
		}
		else {
			clearTimeout(this.scrollXTimer);
		}
		clearTimeout(this.clickStop);
		if (this.scrolling.x === false && this.scrolling.y === false){
			window.removeEventListener('wheel', this.endScroll)
			document.removeEventListener('keydown', this.checkScrollKey)
			document.removeEventListener('click', this.endScroll)
		}
	}

	checkScrollKey = e => {
		if (e.keyCode > 36 && e.keyCode < 41){
			this.endScroll();
		}
	}

	handleWheel = e => {
		e.preventDefault();
		const direction = {x: Number.isPositive(e.deltaX), y: Number.isPositive(e.deltaY)};
		this.scrollBy(direction);
	}

	set smoother(val) {
		if (val) {
			document.addEventListener('wheel', this.handleWheel, {passive: false})
		}
	}

	onResizeTrigger = () => {
		if (!this.inResizeDelay && this.resizeCallback){
			this.resizeCallback(window.pageYOffset, window.pageXOffset);
			this.inResizeDelay=true;
			setTimeout(() => {
				this.inResizeDelay=false;
				this.resizeCallback(window.pageYOffset, window.pageXOffset);

			}, this.resizeCallbackDelay)
		}
	}

	set scroll (callback) {
		if (!callback){
			window.removeEventListener('scroll', this.onScrollTrigger);
		}
		else{
			this.inScrollDelay = false;
			window.removeEventListener('scroll', this.onScrollTrigger)
			this.callback = callback;
			window.addEventListener('scroll', this.onScrollTrigger)
		}
	}

	set resize (callback) {
		if (!callback){
			window.removeEventListener('resize', this.onResizeTrigger);
		}
		else{
			this.inResizeDelay = false;
			window.removeEventListener('resize', this.onResizeTrigger)
			this.resizeCallback = callback;
			window.addEventListener('resize', this.onResizeTrigger)
		}
	}

	set scrollTo (vals) {
		const max = {x: Number.confine(document.body.scrollWidth - window.innerWidth, null, 0), y: Number.confine(document.body.scrollHeight - window.innerHeight, null, 0)}
		this.scrollTarget = {x: Number.confine(vals.x, max.x, 0), y: Number.confine(vals.y, max.y, 0)}
	}

	scrollBy = vals => {
		vals.x = Number.isPositive(vals.x)*50;
		vals.y = Number.isPositive(vals.y)*50;
		const {x = window.scrollX, y = window.scrollY} = this.scrollTarget
		this.scrollTo = {x: x + vals.x, y: y + vals.y}
		this.scrollTowards();
		this.scrollTowards(false);
	}

	scrollTowards = (isY = true) => {
		const pageOffset = isY ? window.pageYOffset : window.pageXOffset;
		const target = isY ? this.scrollTarget.y : this.scrollTarget.x;
		const distance = target - pageOffset;
		const toScroll = Number.confine(Number.calcAdditive(distance), 40) * Number.isPositive(distance)
		window.scrollBy(isY ? 0 : toScroll, isY ? toScroll : 0)
		if (Math.abs(toScroll) > 3){
			isY ? this.scrollYTimer = setTimeout(() => this.scrollTowards(), 10) : this.scrollXTimer = setTimeout(() => this.scrollTowards(false), 10);
		}
		else {
			if(isY){
				this.scrollTarget.y = this.pageYOffset;
				this.endScroll(false)
			}
			else {
				this.scrollTarget.x = this.pageXOffset;
				this.endScroll(false, false)
			}
		}
	}

	set location (value) {
		this.scrolling = {x: true, y: true};
		document.addEventListener('keydown', this.checkScrollKey);
		window.addEventListener('wheel', this.endScroll);
		this.clickStop = setTimeout(() => document.addEventListener('click', this.endScroll), 500)
		if (typeof value === 'object'){
			if (value.getBoundingClientRect){
				const x = document.body.scrollWidth === window.scrollX + document.body.clientWidth ? 0 : value.getBoundingClientRect().left + value.clientWidth / 2 - window.innerWidth + this.offset.x;
				const y = value.getBoundingClientRect().top + window.scrollY + this.offset.y;
				this.gentleScroll(y, x)
			}
			else {
				value[0] ? this.gentleScroll(value[1], value[0]) : this.gentleScroll(value.y + this.offset.y, value.x + this.offset.x);
			}
		}
		else {
			this.gentleScroll(value + this.offset.y);
		}
	}

	gentleScroll(y, x = window.scrollX) {
		this.scrollTo = {y, x};
		this.scrollTowards()
		this.scrollTowards(false);
	}

	reset() {
		const {x, y} = this.loc;
		window.scrollTo(x, y)
	}

	set locked (value) {
		if (!value){
			this.loc = {x: false, y: false}
			document.removeEventListener('scroll', this.resetter);
			alterClass(document.body, 'svz-locked', true)
		}
		else{
			setTimeout(() => {
				this.loc = {x: window.pageXOffset, y: window.pageYOffset}
				document.addEventListener('scroll', this.resetter);
				alterClass(document.body, 'svz-locked');
			},50);
		}
		this.isLocked = value;
	}

	get locked (){
		return this.isLocked;
	}
}

export {CookieMan, ScreenMan, Gradienter}