/**
 * 被代理的函数
 * @param a
 * @param b
 * @returns {*}
 */
function sum(a, b) {
    return a + b;
}

const handler = {
    /**
     * 拦截函数的调用
     * @param target 被代理的函数
     * @param thisArg 被调用时的上下文对象
     * @param argumentsList 参数数组
     */
    apply(target, thisArg, argumentsList) {
        console.log('target 和被代理的函数是否一样:', target === sum)
        console.log('thisArg上下文对象', thisArg);
        console.log('参数列表:', argumentsList);
        const result = target(argumentsList[0], argumentsList[1]);
        console.log(result * 10);
    }
}

const proxy = new Proxy(sum, handler);
// 调用函数
proxy();

