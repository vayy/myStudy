const obj = {
    a: 1,
    b: 2,
    [Symbol('c')]: 'symbol'
};
const handler = {
    /**
     * 拦截 Object.getOwnPropertyNames()、Object.getOwnPropertySymbols()、Reflect.ownKeys()、Object.keys() 方法
     * @param target
     * @returns {(string | symbol)[]}
     */
    ownKeys(target) {
        console.log('----------------------');
        // 调用底层的 ownKeys 方法
        return Reflect.ownKeys(target);
    }
}

const proxy = new Proxy(obj, handler);

console.log(Object.getOwnPropertyNames(proxy)); // [ 'a', 'b' ]
console.log(Object.getOwnPropertySymbols(proxy));   // [ Symbol(c) ]
console.log(Reflect.ownKeys(proxy));    // [ 'a', 'b', Symbol(c) ]
console.log(Object.keys(proxy));    // [ 'a', 'b' ]