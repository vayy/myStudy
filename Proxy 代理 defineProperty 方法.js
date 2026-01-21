const obj = {}

const handler = {
    /**
     * 拦截对代理对象的 Object.defineProperty() 操作
     * @param target 被代理的原对象
     * @param property 被定义的属性名
     * @param descriptor 属性名的描述，是一个对象, 只有 enumerable、configurable、writable、value、get()、set() 属性
     * @returns {boolean} 必须返回一个 boolean，表示操作是否成功
     */
    defineProperty(target, property, descriptor) {
        console.log('target 是否是被代理的原对象', target === obj);   // true
        console.log('被定义的属性名', property);   // a
        console.log('属性名的描述',descriptor);
        // 调用的底层的 defineProperty 方法
        Reflect.defineProperty(target, property, descriptor);
        return true;
    }
}

const proxy = new Proxy(obj, handler);
Object.defineProperty(proxy, 'a', {
    /**
     * 是否可写，默认为 false
     * 值为 true 则表示 proxy.a 可以被重新赋值
     * false 则表示proxy.a 不可被重新赋值
     * writable/value 和 get/set 只能出现一对，不能同时出现
     */
    writable: true,
    /**
     * 是否可被枚举，默认为 false
     * 值为 true 时表示该属性可被枚举发现，即 Object.keys(proxy) 会出现 a，反之则不会
     */
    enumerable: false,
    /**
     * 是否可被配置，默认为 false
     * 值为 false 表示不可被配置，表现为
     * 1. delete proxy.a 无效，
     * 2. 重新定义描述时，除了 writable 和 value 之外的描述配置都无效
     * 3. writable 只能从 true 改为 false，不能从 false 改为 true
     */
    configurable: false,
    // 属性值，默认为 undefined
    value: {
        x: 1,
        y: 2
    },
    /**
     * 属性的 getter 函数，默认为 undefined
     * 不可与 value 和 writable 同时出现
     */
    // get() {
    //     return {
    //         x: 1,
    //         y: 2
    //     }
    // },
    /**
     * 属性的 setter 函数，默认为 undefined
     * 不可与 value 和 writable 同时出现
     */
    // set(newValue) {
    //     console.log(newValue);
    // }
})
console.log(proxy.a)
proxy.a = 6;
console.log(proxy)
delete proxy.a;
console.log(proxy.a)

// Object.defineProperty(proxy, 'a', {
//     // writable: false,
//     value: {
//         z: 100
//     }
// })

console.log(proxy.a)