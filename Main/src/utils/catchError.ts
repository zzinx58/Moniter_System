let lastEvent: Event;
[
    'click',
    'mousedown',
    // 'mouseover',
    'keydown',
    'touchstart',
].forEach(eventType => {
    document.addEventListener(eventType, (event) => {
        lastEvent = event;
    }, {
        capture: true,
        passive: true // 默认不阻止默认事件
    });
})
export function getLastEvent() {
    return lastEvent;
}

export function getSelector(pathsOrTarget: { parentNode: any; }) {
    if (Array.isArray(pathsOrTarget)) {
        return handleSelector(pathsOrTarget);
    } else {
        let pathArr = [];
        while (pathsOrTarget) {
            pathArr.push(pathsOrTarget as never);
            pathsOrTarget = pathsOrTarget.parentNode;
        }
        return handleSelector(pathArr);
    }
}
function handleSelector(pathArr: any[]) {
    return pathArr.reverse().filter(element => {
        // 去除 document 和 window
        return element !== document && element !== window;
    }).map(element => {
        let selector: string = ''
        const { id, nodeName, className } = element;
        if (id) {
            return `${nodeName.toLowerCase()}#${id}`;
        } else if (className && typeof className === 'string') {
            return `${nodeName.toLowerCase()}.${className}`;
        } else {
            selector = nodeName.toLowerCase()
        }
        return selector
    }).join(' ');
}