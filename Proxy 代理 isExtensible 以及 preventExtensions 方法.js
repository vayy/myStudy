const obj = {};

const handler = {
    /**
     * 拦截 Object.isExtensible()
     * @param target 被代理的原对象
     * @returns {boolean} 表示是否可扩展
     */
    isExtensible(target) {
        console.log('isExtensible', target === obj);    // isExtensible true
        return Reflect.isExtensible(target);
    },
    /**
     * 拦截 Object.preventExtensions()
     * @param target 被代理的原对象
     * @returns {boolean} 表示是否被成功设置成功
     */
    preventExtensions(target) {
        console.log('preventExtensions', target === obj);   // preventExtensions true
        return Reflect.preventExtensions(target)
    }
}

const proxy = new Proxy(obj, handler);
proxy.a = 1;
console.log(proxy)  // { a: 1 }
console.log(Object.isExtensible(proxy)) // true

// 不让 proxy 上再能添加属性
Object.preventExtensions(proxy);

// 不生效
proxy.b = 2;
console.log(proxy); // { a: 1 }