class HashNode {
    get key() { return this._key; }
    ;
    get value() { return this._value; }
    ;
    set value(val) { this._value = val; }
    ;
    constructor(key, value) {
        this._key = key;
        this._value = value;
    }
}
class HashMap {
    constructor() {
        this._loadFactor = 0.75;
        this._capacity = 16;
        this._buckets = [];
        this._filled = 0;
    }
    length() { return this._filled; }
    ;
    clear() {
        this._filled = 0;
        this._buckets = [];
        this._capacity = 16;
    }
    set(key, value) {
        const hash = this.getIndex(key);
        if (hash < 0 || hash >= this._capacity) {
            throw new Error("Trying to access index out of bound.");
        }
        if (!this._buckets[hash]) {
            this._buckets[hash] = new HashNode(key, value);
            this._filled++;
        }
        else if (this._buckets[hash].key === key) {
            this._buckets[hash].value = value;
        }
        else {
            console.log('Hash value has been used, item not added.');
            return;
        }
        if (this._filled > (this._loadFactor * this._capacity)) {
            this.growbuckets();
        }
    }
    get(key) {
        const hash = this.getIndex(key);
        if (hash < 0 || hash >= this._capacity) {
            throw new Error("Trying to access index out of bound.");
        }
        if (this._buckets[hash] && this._buckets[hash].key === key) {
            return this._buckets[hash].value;
        }
        return null;
    }
    has(key) {
        const hash = this.getIndex(key);
        if (hash < 0 || hash >= this._capacity) {
            throw new Error("Trying to access index out of bound.");
        }
        if (this._buckets[hash] && this._buckets[hash].key === key) {
            return true;
        }
        return false;
    }
    remove(key) {
        const hash = this.getIndex(key);
        if (hash < 0 || hash >= this._capacity) {
            throw new Error("Trying to access index out of bound.");
        }
        if (this._buckets[hash] && this._buckets[hash].key === key) {
            delete this._buckets[hash];
            this._filled--;
            return true;
        }
        else {
            return false;
        }
    }
    keys() {
        const keyArr = [];
        for (let i = 0; i < this._buckets.length; i++) {
            if (this._buckets[i]) {
                keyArr.push(this._buckets[i].key);
            }
        }
        return keyArr;
    }
    values() {
        const valArr = [];
        for (let i = 0; i < this._buckets.length; i++) {
            if (this._buckets[i]) {
                valArr.push(this._buckets[i].value);
            }
        }
        return valArr;
    }
    entries() {
        const entryArr = [];
        for (let i = 0; i < this._buckets.length; i++) {
            if (this._buckets[i]) {
                entryArr.push([this._buckets[i].key, this._buckets[i].value]);
            }
        }
        return entryArr;
    }
    hash(key) {
        let hashCode = 0;
        const prime = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = prime * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    }
    getIndex(key) {
        return this.hash(key) % this._capacity;
    }
    growbuckets() {
        const newBuckets = [];
        this._capacity *= 2;
        for (let i = 0; i < this._buckets.length; i++) {
            if (this._buckets[i]) {
                const key = this._buckets[i].key;
                const val = this._buckets[i].value;
                const hash = this.getIndex(key);
                if (hash < 0 || hash >= this._capacity) {
                    throw new Error("Trying to access index out of bound.");
                }
                newBuckets[hash] = new HashNode(key, val);
            }
        }
        ;
        this._buckets = newBuckets;
    }
}
const hashMap = new HashMap();
hashMap.set("Turtle", 4);
hashMap.set("eltrut", 5);
hashMap.set('a', 1);
hashMap.set('b', 1);
hashMap.set('c', 1);
hashMap.set('e', 1);
hashMap.set('f', 1);
hashMap.set('g', 1);
hashMap.set('h', 1);
hashMap.set('i', 1);
hashMap.set('j', 1);
hashMap.set('k', 1);
hashMap.set('l', 1);
hashMap.set('m', 1);
hashMap.set('n', 1);
hashMap.set('o', 1);
hashMap.set('p', 1);
hashMap.set('q', 1);
hashMap.set('r', 1);
hashMap.set('d', 1);
console.log(hashMap);
console.log(hashMap.entries());
//# sourceMappingURL=Project.js.map