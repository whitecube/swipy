export default class Swipy {
    
    constructor(element) {
        this.root = element;
        this.events = this.getDefaultEvents();
        this.touch = this.getDefaultTouches();
        this.bind();
    }

    //  API

    on(listener, callback) {
        if(this.events[listener] === undefined) {
            console.error('Swipy - Event "' + listener + '" is undefined.');
            return;
        }
        this.events[listener].push(callback);
        return this;
    }

    trigger(listener, event) {
        if(this.events[listener] === undefined) {
            console.error('Swipy - Unable to call undefined "' + listener + '" event.');
            return;
        }
        for (var i = 0; i < this.events[listener].length; i++) {
            this.events[listener][i](event, this.touch);
        }
        this.touch = this.getDefaultTouches();
    }

    //  SETUP

    bind() {
        this.root.addEventListener('touchstart', ((self) => {return (e) => { self.handleTouchStart(e); }})(this), false);
        this.root.addEventListener('touchmove', ((self) => {return (e) => { self.handleTouchMove(e); }})(this), false);
    }

    unbind() {
        this.root.removeEventListener('touchstart', ((self) => {return (e) => { self.handleTouchStart(e); }})(this));
        this.root.removeEventListener('touchmove', ((self) => {return (e) => { self.handleTouchMove(e); }})(this));
    }

    getDefaultEvents() {
        return {
            'swipetop': [],
            'swiperight': [],
            'swipebottom': [],
            'swipeleft': []
        };
    }

    getDefaultTouches() {
        return {
            down: {x: null, y: null},
            up: {x: null, y: null},
            diff: {x: null, y: null}
        };
    }

    handleTouchStart(event) {
        this.touch.down.x = event.touches[0].clientX;
        this.touch.down.y = event.touches[0].clientY;
    }

    handleTouchMove(event) {
        if (!this.touch.down.x || !this.touch.down.y) {
            return;
        }
        this.touch.up.x = event.touches[0].clientX;
        this.touch.up.y = event.touches[0].clientY;
        this.touch.diff.x = this.touch.down.x - this.touch.up.x;
        this.touch.diff.y = this.touch.down.y - this.touch.up.y;
        if (Math.abs(this.touch.diff.x) > Math.abs(this.touch.diff.y)) {
            if (this.touch.diff.x > 0) return this.trigger('swipeleft', event);
            return this.trigger('swiperight', event);
        }
        if (this.touch.diff.y > 0) return this.trigger('swipetop', event);
        return this.trigger('swipebottom', event);
    }
}
