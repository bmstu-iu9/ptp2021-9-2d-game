export function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

export function detectCollision(first, second) {
    return !(first.y + first.height < second.y ||
            second.y + second.height < first.y ||
            first.x + first.width < second.x ||
            second.x + second.width < first.x);
}
