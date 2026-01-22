const obj = {
    a: 1
};

const handler = {
    /**
     * 代理获取属性描述
     * @param target 被代理的对象
     * @param prop 要获取的属性名
     * @returns {TypedPropertyDescriptor<PropertyKey extends keyof object ? object[PropertyKey] : any>}
     */
    getOwnPropertyDescriptor(target, prop) {
        console.log(prop);
        // 调用底层的获取属性描述的方法
        return Reflect.getOwnPropertyDescriptor(target, prop);
    }
}

const proxy = new Proxy(obj, handler);

console.log(Object.getOwnPropertyDescriptor(proxy, 'a'));   // { value: 1, writable: true, enumerable: true, configurable: true }