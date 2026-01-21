// Proxy：生成一个代理对象，代理对象可以代理目标对象的基本操作
// 基本操作如：get、set 等
/**
 * 参数：
 *  target：要代理的目标对象
 *  handler: 一个对象，key 是基本操作的方法名，value 是处理函数
 */
// 例子
// 要被代理的对象
const target = {
    name: '张三'
}

// 代理方法的对象
const handler = {
    /**
     * 拦截获取属性值的操作
     * 参数：
     *  target: 被代理的对象
     *  property: 被读取的属性名
     *  receiver: 代理对象本身
     */
    get(target, property, receiver) {
        console.log('被代理的对象:', target);
        console.log('被读取的属性:', property);
        console.log('receiver是否是代理对象:', receiver === proxy);
        return target[property];
    },
    /**
     * 拦截设置属性值的操作
     * @param target
     * @param property
     * @param value
     * @param receiver
     */
    set(target, property, value, receiver) {
        // 实现一个功能，新的值和老的值的数据类型相同才能被设置，否则报错
        if (value.constructor.name === target[property].constructor.name) {
            target[property] = value;
        }
        else {
            throw new Error(`新设置的值的类型与原值类型不匹配，新: ${ value.constructor.name }, 原: ${ target[property].constructor.name }`);
        }
    }
}

// 创建代理对象
const proxy = new Proxy(target, handler);
// 读取 proxy 的 name 属性
console.log(proxy.name);

proxy.name = '李四';
console.log(proxy.name);
// proxy.name = 18;    // 会报错，报 Error: 新设置的值的类型与原值类型不匹配，新: Number, 原: String