import { handleSelector } from "@/monitor/baseHandlers";

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