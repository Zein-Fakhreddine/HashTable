

/**
 * A Bucket contains the nodes for the specific placement of the hash
 * The amount of Buckets are based on the ARRAY_SIZE of the hash
 * @constructor
 */
var Bucket = function () {
    this._nodes = [];
};

/**
 * Nodes contain all the information for a value
 * @param key The key that pairs with the value
 * @param hash The hash of the key
 * @param value The value that pairs with the key
 */
var node = function (key, hash, value) {
    this._hash = hash;
    this._value = value;
    this._key = key;
};

/**
 * The constructor for all hash tables
 * Generates all the buckets
 * @param arraySize An optional argument (default 16) that determines the amount of buckets in a table
 * @constructor
 */
function HashTable(arraySize) {
    arraySize = arraySize || 16;
    this._buckets = [];
    this._count = 0;
    for (var i = 0; i < arraySize; i++)
        this._buckets[i] = new Bucket();
}

/**
 * Adds a key value pair to the hash table
 * Generates a hash using the hash function
 * Adds a node to a given bucket
 * @param key The key Given
 * @param value The value Given
 * @returns {boolean} false if the key has been used
 */
HashTable.prototype.put = function (key, value) {
    if (this.contains(key)) {
        console.error("this key is already being used");
        return false;
    }
    var hash = this.hash(key);
    var index = hash & (this._buckets.length - 1);
    this._buckets[index]._nodes.push(new node(key, hash, value));
    this._count++;
    return true;
};

/**
 * Gets the value of a pair from the key
 * @param key The key to get the value
 * @returns {*} The nodes value
 */
HashTable.prototype.get = function (key) {
    var hash = this.hash(key);
    var index = hash & (this._buckets.length - 1);
    var nodes = this._buckets[index]._nodes;
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i]._key == key && nodes[i]._hash == hash)
            return nodes[i]._value;
    }
};

/**
 * hashes all the keys in a pair
 * Wraps Java's HashTable hash function
 * @param key The key to hash
 * @returns {number} The hash
 */
HashTable.prototype.hash = function (key) {
    var hash = 0, i, chr, len;
    if (key.length === 0) return hash;
    for (i = 0, len = key.length; i < len; i++) {
        chr   = key.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

/**
 * Checks if a key is already used
 * @param key The key to check
 * @returns {boolean} True if it is being used
 */
HashTable.prototype.contains = function (key) {
    return this.get(key) != undefined;
};

/**
 * Removes a node based on the key given
 * @param key The key that correlates to the node
 * @returns {boolean} false if it didnt find the key
 */
HashTable.prototype.remove = function (key) {
    var hash = this.hash(key);
    var index = hash & (this._buckets.length - 1);
    var nodes = this._buckets[index]._nodes;
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i]._key == key && nodes[i]._hash == hash){
            nodes.splice(i, 1);
            this._count--;
            return true;
        }
    }
    return false;
};

/**
 * Clears all the nodes in each of the buckets
 */
HashTable.prototype.clear = function(){
    for(var i = 0; i < this._buckets.length; i++)
        for(var n = 0; n < this._buckets[i]._nodes.length; n++)
            this._buckets[i]._nodes = [];

    this._count = 0;
};

HashTable.prototype.size = function () {
    return this._count;
};

module.exports = HashTable;