const obj = {
    a: 1,
    b: 2
}

const handler = {
    /**
     * 拦截 in 操作符
     * @param target 被代理的原对象
     * @param prop 需要被检查的属性名
     * @returns {boolean} 表示是否有
     */
    has(target, prop) {
        if (prop === 'a') {
            return false;
        }
        return true;
    }
}

const proxy = new Proxy(obj, handler);
console.log('a' in proxy);  // false
console.log('b' in proxy);  // true