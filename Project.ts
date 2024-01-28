class  HashNode
{
    public get key() {return this._key};
    public get value() {return this._value};
    public set value(val: any) {this._value = val};
    protected _key: string;
    protected _value: any;
    constructor(key: string, value: any)
    {
        this._key = key;
        this._value = value;
    }
}

class  SetNode
{
    public get key() {return this._key};
    protected _key: string;
    constructor(key: string)
    {
        this._key = key;
    }
}

class HashMap
{
    protected _buckets: HashNode[]
    protected _loadFactor: number;
    protected _capacity: number;
    protected _filled: number;

    constructor()
    {
        this._loadFactor = 0.75;
        this._capacity = 16;
        this._buckets = [];
        this._filled = 0;
    }

    public length() { return this._filled };

    public clear() 
    {
        this._filled = 0;
        this._buckets = [];
        this._capacity = 16;
    }

    public set(key: string, value: any) 
    {   
        const hash = this.getIndex(key);
        if (hash < 0 || hash >= this._capacity) { 
            throw new Error("Trying to access index out of bound.")
        }
        if (!this._buckets[hash])
        {
            this._buckets[hash] = new HashNode(key, value);
            this._filled++;
        }
        else if (this._buckets[hash].key === key)
        {
            this._buckets[hash].value = value;
        }
        else
        {
            console.log('Hash value has been used, item not added.')
            return;
        }

        if (this._filled > (this._loadFactor * this._capacity))
        {
            this.growbuckets();
        }
    }

    public get(key: string)
    {
        const hash = this.getIndex(key);
        if (hash < 0 || hash >= this._capacity) { 
            throw new Error("Trying to access index out of bound.")
        }
        if (this._buckets[hash] && this._buckets[hash].key === key)
        {
            return this._buckets[hash].value;
        }
        return null;
    }

    public has(key: string)
    {
        const hash = this.getIndex(key);
        if (hash < 0 || hash >= this._capacity) { 
            throw new Error("Trying to access index out of bound.")
        }
        if (this._buckets[hash] && this._buckets[hash].key === key)
        {
            return true;
        }
        return false;
    }

    public remove(key: string)
    {
        const hash = this.getIndex(key);
        if (hash < 0 || hash >= this._capacity) { 
            throw new Error("Trying to access index out of bound.")
        }
        if (this._buckets[hash] && this._buckets[hash].key === key)
        {
            delete this._buckets[hash];
            this._filled--;
            return true;
        }
        else 
        {
            return false;
        }
    }

    public keys() 
    {
        const keyArr: string[] = [];
        for (let i = 0; i < this._buckets.length; i++)
        {
            if (this._buckets[i])
            {
                keyArr.push(this._buckets[i].key);
            }
        }
        return keyArr;
    }

    public values()
    {
        const valArr: any[] = [];
        for (let i = 0; i < this._buckets.length; i++)
        {
            if (this._buckets[i])
            {
                valArr.push(this._buckets[i].value);
            }
        }
        return valArr;
    }

    public entries()
    {
        const entryArr: Array<[string, any]> = [];
        for (let i = 0; i < this._buckets.length; i++)
        {
            if (this._buckets[i])
            {
                entryArr.push([this._buckets[i].key, this._buckets[i].value]);
            }
        }
        return entryArr;
    }

    protected hash(key: string)
    {
        let hashCode = 0;
        const prime = 31;
        for (let i = 0; i < key.length; i++)
        {
            hashCode = prime * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    }

    protected getIndex(key: string)
    {
        return this.hash(key) % this._capacity;
    }

    protected growbuckets()
    {
        const newBuckets: HashNode[] = [];
        this._capacity *= 2;
        for (let i = 0; i < this._buckets.length; i++)
        {
            if (this._buckets[i])
            {
                const key = this._buckets[i].key;
                const val = this._buckets[i].value;
                const hash = this.getIndex(key);
                if (hash < 0 || hash >= this._capacity) { 
                    throw new Error("Trying to access index out of bound.")
                }
                newBuckets[hash] = new HashNode(key, val);
            }
        };
        this._buckets = newBuckets;
    }
}

class HashSet
{
    protected _buckets: SetNode[]
    protected _loadFactor: number;
    protected _capacity: number;
    protected _filled: number;

    constructor()
    {
        this._loadFactor = 0.75;
        this._capacity = 16;
        this._buckets = [];
        this._filled = 0;
    }

    public length() { return this._filled };

    public clear() 
    {
        this._filled = 0;
        this._buckets = [];
        this._capacity = 16;
    }

    public set(key: string) 
    {   
        const hash = this.getIndex(key);
        if (hash < 0 || hash >= this._capacity) { 
            throw new Error("Trying to access index out of bound.")
        }
        if (!this._buckets[hash])
        {
            this._buckets[hash] = new SetNode(key);
            this._filled++;
        }
        else
        {
            console.log('Hash value has been used, item not added.')
            return;
        }

        if (this._filled > (this._loadFactor * this._capacity))
        {
            this.growbuckets();
        }
    }

    public get(key: string)
    {
        const hash = this.getIndex(key);
        if (hash < 0 || hash >= this._capacity) { 
            throw new Error("Trying to access index out of bound.")
        }
        if (this._buckets[hash] && this._buckets[hash].key === key)
        {
            return this._buckets[hash].key;
        }
        return null;
    }

    public has(key: string)
    {
        const hash = this.getIndex(key);
        if (hash < 0 || hash >= this._capacity) { 
            throw new Error("Trying to access index out of bound.")
        }
        if (this._buckets[hash] && this._buckets[hash].key === key)
        {
            return true;
        }
        return false;
    }

    public remove(key: string)
    {
        const hash = this.getIndex(key);
        if (hash < 0 || hash >= this._capacity) { 
            throw new Error("Trying to access index out of bound.")
        }
        if (this._buckets[hash] && this._buckets[hash].key === key)
        {
            delete this._buckets[hash];
            this._filled--;
            return true;
        }
        else 
        {
            return false;
        }
    }

    public keys() 
    {
        const keyArr: string[] = [];
        for (let i = 0; i < this._buckets.length; i++)
        {
            if (this._buckets[i])
            {
                keyArr.push(this._buckets[i].key);
            }
        }
        return keyArr;
    }

    protected hash(key: string)
    {
        let hashCode = 0;
        const prime = 31;
        for (let i = 0; i < key.length; i++)
        {
            hashCode = prime * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    }

    protected getIndex(key: string)
    {
        return this.hash(key) % this._capacity;
    }

    protected growbuckets()
    {
        const newBuckets: SetNode[] = [];
        this._capacity *= 2;
        for (let i = 0; i < this._buckets.length; i++)
        {
            if (this._buckets[i])
            {
                const key = this._buckets[i].key;
                const hash = this.getIndex(key);
                if (hash < 0 || hash >= this._capacity) { 
                    throw new Error("Trying to access index out of bound.")
                }
                newBuckets[hash] = new SetNode(key);
            }
        };
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

console.log(hashMap)
console.log(hashMap.entries());
