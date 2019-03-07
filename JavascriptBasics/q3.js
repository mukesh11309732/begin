function SortArray(array) {
	this.originalArray = array;
	this.getSortedArray = function() {
		sortArray.call(this);
		return this.originalArray;
	}
	var sortArray  = function() {
		this.originalArray = _.sortBy(this.originalArray);
	}
}

function SortObjectArray(objectsArray) {
	SortArray.call(this, objectsArray);
	this.getSortedObjectsArray = function(key) {
		sortObjects.call(this, key);
		return this.originalArray;
	}
	var sortObjects  = function(key) {
		this.originalArray = _.sortBy(this.originalArray, key);
	}
}

SortObjectArray.prototype = Object.create(SortArray.prototype);
SortObjectArray.prototype.constructor = SortObjectArray;

//sort numbers
var sortObjectArrayObj = new SortObjectArray([1, 4, 2, 6]);
console.log(sortObjectArrayObj.getSortedArray());

//sort objects
var sortObjectArrayObj = new SortObjectArray([{name : "dog"}, {name : "cat"}]);
console.log(sortObjectArrayObj.getSortedObjectsArray("name"));