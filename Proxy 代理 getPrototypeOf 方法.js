const obj = {};

const handler = {
    /**
     * 代理获取对象原型的方法
     * @param target 被代理的原对象
     * @returns 对象或者 null
     */
    getPrototypeOf(target) {
        // console.log(target === obj);    // true
        // console.log(this === handler);  // true
        // console.log(Reflect.getPrototypeOf(target).constructor.name) // Object
        return Date.prototype;
    }
}

const proxy = new Proxy(obj, handler);

// 三种获取原型的方法
// 方法一：Object.getPrototypeOf 获取
console.log(Object.getPrototypeOf(proxy) === Date.prototype)   // true
console.log('----------------------------');

// 方法二：通过底层调用的方式获取
console.log(Reflect.getPrototypeOf(proxy) === Date.prototype); // true
console.log('----------------------------');
// 方法三：通过 __proto__ 属性获取
console.log(proxy.__proto__ === Date.prototype);   // true
console.log('-----------------------------');

// 也会触发代理方法 getPrototypeOf
console.log(Date.prototype.isPrototypeOf(proxy));    // true
console.log('-----------------------------');

// 也会触发代理方法 getPrototypeOf
// 也会触发代理方法 getPrototypeOf
// 也会触发代理方法 getPrototypeOf
console.log(proxy instanceof Date); // true