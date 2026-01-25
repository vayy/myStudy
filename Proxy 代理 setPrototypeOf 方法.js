const obj = {};
const handler = {
    /**
     * 拦截设置原型的方法
     * @param target
     * @param prototype 新的原型
     * @returns {boolean} 是否设置成功
     */
    setPrototypeOf(target, prototype) {
        console.log('设置的 Prototype:', prototype);   // 设置的 Prototype: [class MyObject]
        return Reflect.setPrototypeOf(target, prototype);
    }
}

class MyObject {}

const proxy = new Proxy(obj, handler);

// 设置原型为 MyObject
Object.setPrototypeOf(proxy, MyObject);
console.log(Object.getPrototypeOf(proxy));  // [class MyObject]