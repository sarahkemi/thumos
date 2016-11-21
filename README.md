# thumos
Hip module for emitting face movement and emotion events

## install it

`npm install thumos`

## usage

Thumos is built upon the [clmtrackr](https://github.com/auduno/clmtrackr) library and emits only one event every 5 seconds:

- `faceMoving`: emitted every 5 seconds with data desribing the change in facial movement during 5 second intervals

Thumos initiates with three different variables:

-

It also emits emits containing:

-

```javascript
const Thumos = require('thumos')

var faceEvents = new Thumos(videoId, overlayId, drawModel)
faceEvents.bind('faceMoving', function (data) {
	console.log('Face moved!', 'start:', data.start, 'end:', data.end, 'now:' data.now, 'delta average:' data.delta, 'delta arrays:' data.array)
})
```

## coming soon!
The ability to emit events based on emotion change

## license
MIT