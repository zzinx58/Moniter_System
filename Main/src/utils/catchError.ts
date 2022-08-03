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

export function getSelector(pathsOrTarget) {
    if (Array.isArray(pathsOrTarget)) {
        handleSelector(pathsOrTarget);
    } else {
        let pathArr = [];
        while (pathsOrTarget) {
            pathArr.push(pathsOrTarget);
            pathsOrTarget = pathsOrTarget.parentNode;
        }
        return handleSelector(pathArr);
    }
}
function handleSelector (pathArr) {
    return pathArr.reverse().filter(element => {
        // 去除 document 和 window
        return element !== document && element !== window;
    }).map(element => {
        const {id, className, tagName} = element;
        if (id) {
            return `${tagName.toLowerCase()}#${id}`;
        } else if (className && typeof className === 'string') {
            return `${tagName.toLowerCase()}.${className}`;
        } else {
            return tagName.toLowerCase();
        }
    }).join(' ');
}