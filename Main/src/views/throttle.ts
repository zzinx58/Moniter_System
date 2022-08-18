export default function throttle(fn: Function, delay: number,bindElement:HTMLElement) {
    let lock = false;
    return (...args: any[]) => {
        if (lock)
            return;
        //进入加锁
        lock = true;
        setTimeout(() => {
            fn.apply(bindElement, args);
            //执行完毕解锁
            lock = false;
        }, delay);
    }
}