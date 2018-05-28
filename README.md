# Swipy

A lightweight JavaScript library for simple touch swipe gesture events.

## Installation

### NPM

```npm i swipyjs```

### Yarn

```yarn add swipyjs```

## Usage

Define Swipy event listeners by calling `on(event, callback)`:

```javascript
let swipy = new Swipy(document.getElementById('swipy-container'));

swipy.on('swipeleft', function(event, touches) {
    console.log('Swiped to the left!');
});
```

The callback function receives two parameters:

- `event`: the last native `touchmove` event that was triggered.
- `touches`: an object containing the current touch coordinates:

```javascript
{
    down: {x: null, y: null},
    up: {x: null, y: null},
    diff: {x: null, y: null}
}
```

## Methods

### `swipy.on(event, callback)`

Registers a new Swipy event listener.

Available events are:

- `swipetop`
- `swiperight`
- `swipebottom`
- `swipeleft`

### `swipy.bind()`

Adds the native event listeners used by the library.

### `swipy.unbind()`

Removes the native event listeners used by the library.

### `swipy.trigger(listener, event)`

Manually triggers a defined Swipy event.
