# HashTable
HashTable Module for Node.js 
Used to generate and use Hassh Tables
# Usage:
## Adding Values
```javascript
var hashTable = require('./HashTable.js');

var table = new hashTable();

table.put('Cat', {legs: '4', kingdom: 'Animalia'});

var cat = table.get('Cat')
console.log('A cat has ' + cat.legs + ' legs and is part of the ' + cat.kingdom + ' kingdom!' );
//OutPut: A cat has 4 legs and is part of the Animalia kingdom!
```

