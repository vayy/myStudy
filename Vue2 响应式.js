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

function observe(target) {
    for (let key in target) {
        let value = target[key];
        if (isObject(value)) {
            observe(target[key]);
        }

        Object.defineProperty(target, key, {
            get() {
                console.log('读取', key);
                return value;
            },
            set(newVal) {
                if (value !== newVal) {
                    console.log('修改', key + ' =', newVal);
                    value = newVal;
                }
                else {
                    console.log('设置同一个值', key + ' =', newVal);
                }
            }
        })
    }
}

observe(obj);
obj.a;
obj.a = 8;
obj.a = 8;
obj.c.d;
obj.c.d = 9;

obj.h[1] = 10;