class A {
    sex = '';
    constructor(sex) {
        this.sex = sex;
    }
}


const handler = {
    /**
     * 拦截 new 关键字，new 的时候会调用到这里
     * @param target 目标对象
     * @param argumentsList 参数列表
     * @param newTarget 代理对象
     * @returns {*}
     */
    construct(target, argumentsList, newTarget) {
        if (argumentsList.length === 1) {
            return new target(...argumentsList);
        }
        else {
            throw new Error('参数数量不符')
        }
    }
}

// 创建代理对象
const proxy = new Proxy(A, handler);

// new 出实例
const instance = new proxy('男');
console.log(instance.sex)   // 男
