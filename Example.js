var HashTable = require('./HashTable.js');

var people = new HashTable();

var person = function (age, eyeColor) {
    this._age = age;
    this._eyeColor = eyeColor;
};

people.put('Alex', new person(22, 'Blue'));
people.put('Noah', new person(16, 'Brown'));
people.put('Ben', new person(42, 'Green'));
people.put('John', new person(32, 'Blue'));

var p = people.get('John');
console.log('The age of the person is ' + p._age + ' and their eye color is ' + p._eyeColor);
//Output: The age of the person is 32 and their eye color is Blue
