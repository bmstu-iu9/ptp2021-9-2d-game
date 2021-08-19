import * as Constants from './../../constants.js';

export default class BaseTarget {
    constructor(x, y, base) {
        this.x = x;
        this.y = y;
        this.health = base.health;
    }

}
