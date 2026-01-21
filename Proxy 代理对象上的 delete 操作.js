const obj = {
    a: 1,
    b: 3,
    c: 4,
}

const handler = {
    /**
     * 拦截 delete 属性操作
     * @param target 被代理的原对象
     * @param property 被 delete 的属性名
     * @returns {boolean} 是否删除成功
     */
    deleteProperty(target, property) {
        return Reflect.deleteProperty(target, property)
    }
}

const proxy = new Proxy(obj, handler);
console.log(proxy); // { a: 1, b: 3, c: 4 }
delete proxy.a;
console.log(proxy)  // { b: 3, c: 4 }