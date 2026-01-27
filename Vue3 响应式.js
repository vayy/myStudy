const obj = {
    a: 1,
    b: 2,
    c: {
        d: 3,
        e: 4
    },
    h: [5, 6, 7]
}

function isObject(v) {
    return typeof v === 'object' && v !== null;
}

/**
 * 转响应式
 * @param target
 * @returns {object}
 */
function observe(target) {
    return new Proxy(target, {
        /**
         * 拦截 get 方法
         * @param target
         * @param key
         * @param receiver
         * @returns {object}
         */
        get(target, key, receiver) {
            let value = target[key];
            if (isObject(value)) {  // 如果值是对象，再把对象值转响应式
                value = observe(value);
            }

            console.log('读取', key);
            return value;
        },
        set(target, key, newVal, receiver) {
            if (target[key] === newVal) {
                console.warn('修改的值跟之前相同', key, newVal);
            }
            else {
                console.log('修改', key, target[key], newVal);
                target[key] = newVal;
            }
        }
    })
}

const proxy = observe(obj);
console.log(proxy.a);
console.log(proxy.c.d)
proxy.c.d = 8;